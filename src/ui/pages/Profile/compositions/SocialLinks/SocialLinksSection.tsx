import { useMutation } from '@apollo/client/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { FormContainer, SelectElement, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { UpdateAccountSocialLinksDocument, UserFragment } from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { SocialLinksDisplay } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import {
  normalizeAndValidateSocialLinks,
  SOCIAL_PLATFORMS_MAX,
  socialPlatformOptions,
} from '@/utils/socialPlatform';

import InfoSection from '../InfoSection/InfoSection';

const EMPTY_LINK = { platform: '', displayName: '', userName: '', url: '', isPrimary: false };

const SocialLinksSection = ({ userInfo }: { userInfo: UserFragment }) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const hasLinks = (userInfo.socialLinks ?? []).length > 0;

  const defaultValues = {
    socialLinks: (userInfo.socialLinks ?? []).map((link) => ({
      platform: link.platform,
      displayName: link.displayName ?? '',
      userName: link.userName ?? '',
      url: link.url,
      isPrimary: link.isPrimary,
    })),
  };

  const { handleSubmit, control, setValue } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: 'socialLinks' });

  const watchedLinks = useWatch({ control, name: 'socialLinks' });

  const previewLinks = (watchedLinks ?? [])
    .filter((link) => link && link.platform && typeof link.url === 'string' && link.url.trim())
    .map((link, index) => ({
      id: index,
      platform: link.platform,
      platformDisplayName:
        socialPlatformOptions.find((option) => option.id === link.platform)?.label ?? link.platform,
      userName: (link.userName as string) || null,
      displayName: (link.displayName as string) || null,
      url: link.url as string,
      isPrimary: !!link.isPrimary,
    }));

  const [updateAccountSocialLinks] = useMutation(UpdateAccountSocialLinksDocument, {
    refetchQueries: ['UserProfile'],
  });

  const markPrimaryLink = (primaryIndex: number) => {
    fields.forEach((_, index) => {
      setValue(`socialLinks.${index}.isPrimary`, index === primaryIndex, {
        shouldDirty: true,
      });
    });
  };

  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  const onSave = async (values: { socialLinks?: Array<Record<string, unknown>> }) => {
    const rawLinks = (values.socialLinks ?? []).map((link) => ({
      platform: typeof link.platform === 'string' ? link.platform : '',
      displayName: typeof link.displayName === 'string' ? link.displayName : null,
      userName: typeof link.userName === 'string' ? link.userName : null,
      url: typeof link.url === 'string' ? link.url : '',
      isPrimary: !!link.isPrimary,
    }));

    const validation = normalizeAndValidateSocialLinks(rawLinks);

    if (!validation.valid) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t(validation.errorKey, validation.errorParams),
        newType: 'error',
      });

      return;
    }

    try {
      const result = await updateAccountSocialLinks({
        variables: { links: validation.links },
      });

      if (!result.data?.updateAccountSocialLinks?.success) {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('profile.updateFailed'),
          newType: 'error',
        });

        return;
      }

      setToasterVisibility({
        newDuration: 3000,
        newText: t('profile.socialLinksUpdated'),
        newType: 'success',
      });
      closeEditor();
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.updateFailed'),
        newType: 'error',
      });
    }
  };

  return (
    <InfoSection
      icon={<ShareIcon color="primary" />}
      title={t('profile.socialLinks')}
      action={
        <Button variant="outlined" startIcon={<EditIcon />} onClick={openEditor}>
          {t('profile.editSocialLinks')}
        </Button>
      }
    >
      {hasLinks && (
        <Box sx={{ mb: 1 }}>
          <SocialLinksDisplay links={userInfo.socialLinks} />
        </Box>
      )}
      {!hasLinks && (
        <Typography variant="body2" color="text.secondary">
          {t('profile.noSocialLinks')}
        </Typography>
      )}

      <Modal
        open={isEditorOpen}
        onClose={closeEditor}
        title={t('profile.editSocialLinks')}
        maxWidth="sm"
      >
        {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
        <FormContainer onSuccess={handleSubmit(onSave)}>
          <Stack spacing={2}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  p: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.default',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, mx: -0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 'auto' }}>
                    {t('profile.socialLinkLabel', { index: index + 1 })}
                  </Typography>
                  <Tooltip title={t('profile.socialPrimary')}>
                    <IconButton
                      size="small"
                      onClick={() => markPrimaryLink(index)}
                      color={watchedLinks?.[index]?.isPrimary ? 'primary' : 'default'}
                    >
                      {watchedLinks?.[index]?.isPrimary ? (
                        <StarIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <StarBorderIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton size="small" onClick={() => remove(index)} color="error">
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>

                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <SelectElement
                      name={`socialLinks.${index}.platform`}
                      label={t('profile.socialPlatform')}
                      control={control}
                      options={socialPlatformOptions}
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextFieldElement
                      name={`socialLinks.${index}.url`}
                      label={t('profile.socialUrl')}
                      control={control}
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextFieldElement
                      name={`socialLinks.${index}.displayName`}
                      label={t('profile.socialDisplayName')}
                      control={control}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextFieldElement
                      name={`socialLinks.${index}.userName`}
                      label={t('profile.socialUsername')}
                      control={control}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            {previewLinks.length > 0 && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('profile.socialLinksPreview')}
                </Typography>
                <Box sx={{ mt: 1, p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <SocialLinksDisplay links={previewLinks} />
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                disabled={fields.length >= SOCIAL_PLATFORMS_MAX}
                onClick={() => append({ ...EMPTY_LINK, isPrimary: fields.length === 0 })}
              >
                {t('profile.addSocialLink')}
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" onClick={closeEditor}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" variant="contained">
                  {t('common.save')}
                </Button>
              </Box>
            </Box>
          </Stack>
        </FormContainer>
      </Modal>
    </InfoSection>
  );
};

export default SocialLinksSection;
