import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import {
  AccountRole,
  useChangeProfilePictureMutation,
  useRemoveProfilePictureMutation,
  UserProfileQuery,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button, Modal, Typography } from '@/ui/components';
import { FileDropzone, LanguageSelector } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';

import { EditProfile } from './compositions';
import { InfoItem } from './Profile.style';

type ProfileType = {
  userInfo: UserProfileQuery['me'];
  countries: UserProfileQuery['countries'];
  subjects: UserProfileQuery['subjects'];
};

const Profile = ({ userInfo, countries, subjects }: ProfileType) => {
  const { t } = useTranslation();
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

  const dateOfBirth = format(new Date(userInfo?.date_of_birth), 'yyyy MMMM dd');

  return (
    <Container maxWidth="md" style={{ marginTop: '32px' }}>
      <div
        style={{
          margin: '16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar
            src={userInfo.avatar_url || undefined}
            alt={userInfo.nickname || t('profile.profileImage')}
            sx={{ width: 96, height: 96 }}
          />
          <Typography variant="h4" component="p">
            {userInfo.name}
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button startIcon={<EditIcon />} onClick={() => setIsChangePicModalOpen(true)}>
            {t('profile.changePicture')}
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setIsConfirmRemoveModalOpen(true)}
            disabled={userInfo.avatar_url === null}
          >
            {t('profile.deletePicture')}
          </Button>
        </div>
      </div>

      <Paper
        variant="outlined"
        sx={{
          my: 4,
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 3 }}>
          <Typography variant="h5" component="h5">
            {t('language.selector.label')}
          </Typography>
        </div>
        <div style={{ flex: 1 }}>
          <LanguageSelector />
        </div>
      </Paper>

      <Paper variant="outlined" sx={{ my: 4, p: 4 }}>
        <div
          style={{
            marginBottom: '32px',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            {t('profile.profileInformation')}
          </Typography>
          <Button startIcon={<EditIcon />} onClick={() => setIsEditModalOpen(true)}>
            {t('profile.edit')}
          </Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          <InfoItem>
            <Typography>{t('profile.firstName')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.first_name}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.lastName')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.last_name}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.nickname')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.nickname}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.gender')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.gender?.toLowerCase()}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.country')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.country?.denomination}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.nationality')}:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.nationality?.denomination}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>{t('profile.dateOfBirth')}:</Typography>
            <Typography variant="h5" component="p">
              {dateOfBirth}
            </Typography>
          </InfoItem>
        </div>
      </Paper>
      <Paper variant="outlined" sx={{ my: 4, p: 4 }}>
        {userInfo.accountRole === AccountRole.Teacher && (
          <>
            <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
              {t('profile.teacherInformation')}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <Typography gutterBottom>{t('profile.specialty')}:</Typography>
                {userInfo.subjects.map((subject) => (
                  <Chip key={subject.id} label={subject.denomination} sx={{ mr: 1 }} />
                ))}
              </div>
              <div>
                <Typography>{t('profile.bio')}:</Typography>
                <Typography variant="h5" component="p">
                  {userInfo.bio}
                </Typography>
              </div>
              <div>
                <Typography>{t('profile.description')}:</Typography>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: userInfo.description || '',
                  }}
                />
              </div>
            </div>
          </>
        )}
      </Paper>
      <Modal
        open={isChangePicModalOpen}
        onClose={() => setIsChangePicModalOpen(false)}
        title={t('profile.uploadPicture')}
        maxWidth="xs"
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
