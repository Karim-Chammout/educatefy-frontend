import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import person from '@/assets/person.png';
import {
  AccountRole,
  useChangeProfilePictureMutation,
  useRemoveProfilePictureMutation,
  UserFragment,
  UserProfileQuery,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button, Modal, Typography } from '@/ui/components';
import { FileDropzone, LanguageSelector } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';

import { EditProfile, InfoSection, ProfileField } from './compositions';

type ProfileType = {
  userInfo: UserFragment;
  countries: UserProfileQuery['countries'];
  subjects: UserProfileQuery['subjects'];
};

const Profile = ({ userInfo, countries, subjects }: ProfileType) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [isChangePicModalOpen, setIsChangePicModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [changeProfilePic] = useChangeProfilePictureMutation();
  const [removeProfilePic] = useRemoveProfilePictureMutation();

  const onFilesSelected = async (files: File[]) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'profile-imgs');

      const uploadedPicture = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (uploadedPicture.success) {
        await changeProfilePic({
          variables: {
            profilePictureDetails: {
              filePath: uploadedPicture.filePath,
              fileSize: uploadedPicture.fileSize,
              mimeType: uploadedPicture.mimeType,
              originalFileName: uploadedPicture.originalFileName,
              uuid: uploadedPicture.uuid,
            },
          },
        });
      }

      setIsLoading(false);
      setToasterVisibility({
        newDuration: 3000,
        newText: t('profile.pictureUpdated'),
        newType: 'success',
      });

      setIsChangePicModalOpen(false);
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.pictureUpdateFailed'),
        newType: 'error',
      });
      setIsChangePicModalOpen(false);
    }
  };

  const removeProfilePicture = async () => {
    try {
      await removeProfilePic();
      setToasterVisibility({
        newDuration: 3000,
        newText: t('profile.pictureRemoved'),
        newType: 'success',
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.pictureRemoveFailed'),
        newType: 'error',
      });
    }
    setIsConfirmRemoveModalOpen(false);
  };

  const dateOfBirth = format(new Date(userInfo.date_of_birth), 'yyyy MMMM dd');

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Header Section */}
      <Paper
        variant="outlined"
        sx={{
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xxs: 'column', md: 'row' },
              alignItems: { xxs: 'center', md: 'flex-start' },
              gap: 3,
              textAlign: { xxs: 'center', md: 'left' },
            }}
          >
            {/* Avatar Section */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={userInfo.avatar_url || person}
                alt={userInfo.nickname || t('profile.profileImage')}
                sx={{
                  width: 120,
                  height: 120,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[8],
                }}
              />
              <Tooltip title={t('profile.changePicture')}>
                <IconButton
                  onClick={() => setIsChangePicModalOpen(true)}
                  sx={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    width: 40,
                    height: 40,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: theme.shadows[4],
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* User Info */}
            <Box sx={{ flex: 1, alignSelf: 'center' }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                {userInfo.name}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xxs: 'row', md: 'column' },
                gap: 2,
                alignSelf: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditModalOpen(true)}
                variant="contained"
                fullWidth
              >
                {t('profile.edit')}
              </Button>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setIsConfirmRemoveModalOpen(true)}
                disabled={userInfo.avatar_url === null}
                variant="outlined"
                fullWidth
              >
                {t('profile.deletePicture')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Language Settings */}
        <Grid size={{ xxs: 12 }}>
          <InfoSection icon={<LanguageIcon color="primary" />} title={t('language.selector.label')}>
            <Box sx={{ maxWidth: 300 }}>
              <LanguageSelector />
            </Box>
          </InfoSection>
        </Grid>

        {/* Personal Information */}
        <Grid size={{ xxs: 12 }}>
          <InfoSection
            icon={<PersonIcon color="primary" />}
            title={t('profile.profileInformation')}
          >
            <Grid container spacing={3}>
              <ProfileField label={t('profile.firstName')} value={userInfo.first_name} />
              <ProfileField label={t('profile.lastName')} value={userInfo.last_name} />
              <ProfileField label={t('profile.nickname')} value={userInfo.nickname} />
              <ProfileField label={t('profile.gender')} value={userInfo.gender?.toLowerCase()} />
              <ProfileField label={t('profile.country')} value={userInfo.country?.denomination} />
              <ProfileField
                label={t('profile.nationality')}
                value={userInfo.nationality?.denomination}
              />
              <ProfileField label={t('profile.dateOfBirth')} value={dateOfBirth} />
            </Grid>
          </InfoSection>
        </Grid>

        {/* Teacher Information */}
        {userInfo.accountRole === AccountRole.Teacher && (
          <Grid size={{ xxs: 12 }}>
            <InfoSection
              icon={<SchoolIcon color="primary" />}
              title={t('profile.teacherInformation')}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('profile.specialty')}:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {userInfo.subjects.map((subject) => (
                    <Chip
                      key={subject.id}
                      label={subject.denomination}
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('profile.bio')}:
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {userInfo.bio}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('profile.description')}:
                </Typography>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: userInfo.description || '',
                  }}
                />
              </Box>
            </InfoSection>
          </Grid>
        )}
      </Grid>

      {/* Modals */}
      <Modal
        open={isChangePicModalOpen}
        onClose={() => setIsChangePicModalOpen(false)}
        title={t('profile.uploadPicture')}
        maxWidth="sm"
        CTAs={
          <DialogActions>
            <Button variant="outlined" onClick={() => setIsChangePicModalOpen(false)}>
              {t('common.cancel')}
            </Button>
          </DialogActions>
        }
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={100} />
        ) : (
          <FileDropzone onFilesSelected={onFilesSelected} />
        )}
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t('profile.editInformation')}
      >
        <EditProfile
          userInfo={userInfo}
          countries={countries}
          subjectOptions={subjects}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </Modal>

      <Modal
        open={isConfirmRemoveModalOpen}
        onClose={() => setIsConfirmRemoveModalOpen(false)}
        title={t('profile.confirmRemovePicture')}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button variant="outlined" onClick={() => setIsConfirmRemoveModalOpen(false)} fullWidth>
              {t('common.cancel')}
            </Button>
            <Button color="error" onClick={removeProfilePicture} fullWidth>
              {t('profile.confirm')}
            </Button>
          </DialogActions>
        }
      />
    </Container>
  );
};

export default Profile;
