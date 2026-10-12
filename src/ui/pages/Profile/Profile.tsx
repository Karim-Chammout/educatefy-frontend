import { useMutation } from '@apollo/client/react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import person from '@/assets/person.png';
import {
  AccountRole,
  ChangeProfilePictureDocument,
  RemoveProfilePictureDocument,
  UserFragment,
  UserProfileQuery,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button, Modal, Typography } from '@/ui/components';
import { FileDropzone, LanguageSelector, RichTextContent } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import {
  MAX_UPLOAD_FILE_SIZE_BYTES,
  MAX_UPLOAD_FILE_SIZE_MB,
  isFileTooLargeError,
} from '@/utils/fileUpload';

import {
  EditProfile,
  InfoSection,
  NotificationPreferences,
  ProfileField,
  SessionsSection,
  SocialLinksSection,
} from './compositions';

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
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [changeProfilePic] = useMutation(ChangeProfilePictureDocument);
  const [removeProfilePic] = useMutation(RemoveProfilePictureDocument);

  const isTeacher = userInfo.accountRole === AccountRole.Teacher;

  const onFilesSelected = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('richTextEditor.fileSizeError', { size: MAX_UPLOAD_FILE_SIZE_MB }),
        newType: 'error',
      });

      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
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
        newText: isFileTooLargeError(_error)
          ? t('richTextEditor.fileSizeError', { size: MAX_UPLOAD_FILE_SIZE_MB })
          : t('profile.pictureUpdateFailed'),
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
    setIsChangePicModalOpen(false);
  };

  const dateOfBirth = format(new Date(userInfo.date_of_birth), 'yyyy MMMM dd');

  return (
    <div style={{ marginTop: '16px' }}>
      <Paper variant="outlined" sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xxs: 'column', md: 'row' },
              alignItems: { xxs: 'center', md: 'flex-start' },
              gap: 3,
              textAlign: { xxs: 'center', md: 'start' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
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
              <Button
                variant="outlined"
                size="small"
                startIcon={<CameraAltIcon />}
                onClick={() => setIsChangePicModalOpen(true)}
              >
                {t('profile.changePicture')}
              </Button>
            </Box>

            <Box sx={{ flex: 1, alignSelf: 'center' }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                {userInfo.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xxs: 'center', md: 'flex-start' },
                  gap: 1,
                  mt: 1,
                }}
              >
                {userInfo.nickname && (
                  <Typography variant="body1" color="text.secondary">
                    {userInfo.nickname}
                  </Typography>
                )}
                <Chip
                  size="small"
                  color={isTeacher ? 'primary' : 'default'}
                  label={t(isTeacher ? 'register.teacher' : 'register.student')}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xxs: 12 }}>
          <InfoSection
            icon={<PersonIcon color="primary" />}
            title={t('profile.profileInformation')}
            action={
              !isEditingPersonal && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditingPersonal(true)}
                >
                  {t('profile.edit')}
                </Button>
              )
            }
          >
            {isEditingPersonal ? (
              <EditProfile
                mode="personal"
                userInfo={userInfo}
                countries={countries}
                subjectOptions={subjects}
                onClose={() => setIsEditingPersonal(false)}
              />
            ) : (
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
            )}
          </InfoSection>
        </Grid>

        {isTeacher && (
          <Grid size={{ xxs: 12 }}>
            <InfoSection
              icon={<SchoolIcon color="primary" />}
              title={t('profile.teacherInformation')}
              action={
                !isEditingTeacher && (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditingTeacher(true)}
                  >
                    {t('profile.edit')}
                  </Button>
                )
              }
            >
              {isEditingTeacher ? (
                <EditProfile
                  mode="teacher"
                  userInfo={userInfo}
                  countries={countries}
                  subjectOptions={subjects}
                  onClose={() => setIsEditingTeacher(false)}
                />
              ) : (
                <>
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
                    <RichTextContent value={userInfo.description} />
                  </Box>
                </>
              )}
            </InfoSection>
          </Grid>
        )}

        <Grid size={{ xxs: 12 }}>
          <SocialLinksSection userInfo={userInfo} />
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSection icon={<LanguageIcon color="primary" />} title={t('language.selector.label')}>
            <Box sx={{ maxWidth: 300 }}>
              <LanguageSelector />
            </Box>
          </InfoSection>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <InfoSection
            icon={<NotificationsIcon color="primary" />}
            title={t('notificationPreferences.title')}
          >
            <NotificationPreferences />
          </InfoSection>
        </Grid>

        <Grid size={{ xxs: 12 }}>
          <SessionsSection />
        </Grid>
      </Grid>

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 3,
          }}
        >
          <Avatar
            src={userInfo.avatar_url || person}
            alt={userInfo.nickname || t('profile.profileImage')}
            sx={{ width: 64, height: 64 }}
          />
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {userInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo.avatar_url ? t('profile.currentPicture') : t('profile.noPicture')}
            </Typography>
          </Box>
          <Button
            color="error"
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => setIsConfirmRemoveModalOpen(true)}
            disabled={userInfo.avatar_url === null}
          >
            {t('profile.deletePicture')}
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={100} />
        ) : (
          <FileDropzone onFilesSelected={onFilesSelected} />
        )}
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
    </div>
  );
};

export default Profile;
