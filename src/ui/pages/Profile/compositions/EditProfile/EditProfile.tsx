import { useMutation } from '@apollo/client/react';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import {
  AutocompleteElement,
  FieldValues,
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { useTranslation } from 'react-i18next';

import { UpdateProfileDocument, UserProfileQuery } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { genderOptions } from '@/utils/genderOptions';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

type EditProfileMode = 'personal' | 'teacher';

const EditProfile = ({
  mode,
  userInfo,
  countries,
  subjectOptions,
  onClose,
}: {
  mode: EditProfileMode;
  userInfo: UserProfileQuery['me'];
  countries: UserProfileQuery['countries'];
  subjectOptions: UserProfileQuery['subjects'];
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [descriptionContent, setDescriptionContent] = useState(userInfo.description || null);

  const hasDescription = hasRichTextContent(descriptionContent);

  const { setToasterVisibility } = useContext(ToasterContext);

  const defaultValues = {
    firstName: userInfo.first_name || '',
    lastName: userInfo.last_name || '',
    nickname: userInfo.nickname || '',
    nationality: userInfo.nationality?.id || null,
    country: userInfo.country?.id || null,
    gender: userInfo.gender || null,
    dateOfBirth: new Date(userInfo.date_of_birth) || null,
    subjects: userInfo.subjects || [],
    bio: userInfo.bio || '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues,
  });
  const [firstName, lastName, nickname, gender, nationality, country, dateOfBirth, subjects, bio] =
    useWatch({
      name: [
        'firstName',
        'lastName',
        'nickname',
        'gender',
        'nationality',
        'country',
        'dateOfBirth',
        'subjects',
        'bio',
      ],
      control,
    });

  const [updateProfile] = useMutation(UpdateProfileDocument);

  const isPersonalValid =
    firstName?.trim() &&
    lastName?.trim() &&
    nickname?.trim() &&
    gender &&
    nationality &&
    country &&
    dateOfBirth;
  const isTeacherValid = subjects.length > 0 && bio && hasDescription;
  const isValid = mode === 'personal' ? isPersonalValid : isTeacherValid;

  const onSubmit = async (values: FieldValues) => {
    if (!isValid) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    const profileDetails =
      mode === 'personal'
        ? {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            nickname: values.nickname.trim(),
            nationalityId: values.nationality.id,
            countryId: values.country.id,
            gender: values.gender.id,
            dateOfBirth: format(new Date(values.dateOfBirth), 'yyyy-MM-dd'),
          }
        : {
            teacherBio: values.bio,
            teacherSpecialties: values.subjects.map((s: { id: string }) => s.id),
            teacherDescription: descriptionContent,
          };

    const profileResult = await updateProfile({
      variables: { profileDetails },
    });

    if (!profileResult.data?.updateProfile?.success) {
      const messages = (profileResult.data?.updateProfile?.errors ?? [])
        .map((errorItem) => errorItem.message)
        .join(' ');
      let newText = t('profile.updateFailed');

      if (messages.includes('MAX_SUBJECTS_EXCEEDED')) {
        newText = t('profile.maxSubjectsExceeded');
      } else if (messages.includes('MIN_SUBJECTS_REQUIRED')) {
        newText = t('profile.minSubjectsRequired');
      }

      setToasterVisibility({
        newDuration: 5000,
        newText,
        newType: 'error',
      });

      return;
    }

    setToasterVisibility({
      newDuration: 3000,
      newText: t('profile.updateSuccess'),
      newType: 'success',
    });
    onClose();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {mode === 'personal' && (
            <Grid container spacing={3}>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <TextFieldElement
                  name="firstName"
                  label={t('profile.firstName')}
                  control={control}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <TextFieldElement
                  name="lastName"
                  label={t('profile.lastName')}
                  control={control}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <TextFieldElement
                  name="nickname"
                  label={t('profile.nickname')}
                  control={control}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <AutocompleteElement
                  name="gender"
                  label={t('profile.gender')}
                  control={control}
                  options={genderOptions}
                  autocompleteProps={{
                    fullWidth: true,
                  }}
                  required
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <AutocompleteElement
                  name="country"
                  label={t('profile.country')}
                  control={control}
                  options={countries.map((c) => ({
                    id: c.id,
                    label: c.denomination,
                  }))}
                  autocompleteProps={{
                    fullWidth: true,
                  }}
                  required
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <AutocompleteElement
                  name="nationality"
                  label={t('profile.nationality')}
                  control={control}
                  options={countries.map((c) => ({
                    id: c.id,
                    label: c.denomination,
                  }))}
                  autocompleteProps={{
                    fullWidth: true,
                  }}
                  required
                />
              </Grid>
              <Grid size={{ xxs: 12, sm: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePickerElement
                    name="dateOfBirth"
                    label={t('profile.dateOfBirth')}
                    control={control}
                    sx={{ width: '100%' }}
                    disableFuture
                    required
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}
          {mode === 'teacher' && (
            <>
              <AutocompleteElement
                name="subjects"
                label={t('profile.specialty')}
                control={control}
                autocompleteProps={{
                  // TODO: Check if the library has been updated or double check a proper fix for this
                  // Seems like there is a bug in the library and the limitTags option doesn't work
                  // Workaround for disabling the option when the limit is reached
                  getOptionDisabled: () => subjects.length >= 3,
                }}
                options={subjectOptions.map((s) => ({
                  id: s.id,
                  label: s.denomination,
                }))}
                multiple
                required
              />
              <TextareaAutosizeElement
                name="bio"
                label={t('profile.bio')}
                control={control}
                required
              />
              <RichTextEditor
                onChange={setDescriptionContent}
                value={descriptionContent}
                placeholder={t('profile.descriptionPlaceholder')}
              />
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <Button variant="outlined" onClick={onClose} fullWidth>
            {t('common.cancel')}
          </Button>
          <Button type="submit" fullWidth disabled={!isValid}>
            {t('profile.save')}
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default EditProfile;
