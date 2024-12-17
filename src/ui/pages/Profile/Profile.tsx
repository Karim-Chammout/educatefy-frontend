import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
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
import { ButtonsWrapper, InfoItem } from './Profile.style';

type ProfileType = {
  userInfo: UserProfileQuery['me'];
  countries: UserProfileQuery['countries'];
};

const Profile = ({ userInfo, countries }: ProfileType) => {
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
        newText: 'Profile picture updated successfully!',
        newType: 'success',
      });

      setIsChangePicModalOpen(false);
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: 'Failed to update profile picture. Please try again later!',
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
        newText: 'Profile picture removed successfully!',
        newType: 'success',
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: 'Failed to remove profile picture. Please try again later!',
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
            alt={userInfo.nickname || 'Profile image'}
            sx={{ width: 96, height: 96 }}
          />
          <Typography variant="h4" component="p">
            {userInfo.name}
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button startIcon={<EditIcon />} onClick={() => setIsChangePicModalOpen(true)}>
            Change picture
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setIsConfirmRemoveModalOpen(true)}
            disabled={userInfo.avatar_url === null}
          >
            Delete picture
          </Button>
        </div>
      </div>

      <Paper
        elevation={4}
        sx={{
          my: 4,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h5" component="h5">
          {t('language.selector.label')}
        </Typography>
        <LanguageSelector />
      </Paper>

      <Paper elevation={4} sx={{ my: 4, p: 4 }}>
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
            Profile Information
          </Typography>
          <Button startIcon={<EditIcon />} onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          <InfoItem>
            <Typography>First Name:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.first_name}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>last Name:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.last_name}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>Nickname:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.nickname}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>Gender:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.gender?.toLowerCase()}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>Country:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.country?.denomination}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>Nationality:</Typography>
            <Typography variant="h5" component="p">
              {userInfo.nationality?.denomination}
            </Typography>
          </InfoItem>
          <InfoItem>
            <Typography>Date of birth:</Typography>
            <Typography variant="h5" component="p">
              {dateOfBirth}
            </Typography>
          </InfoItem>
        </div>
        {userInfo.accountRole === AccountRole.Teacher && (
          <div>
            <Typography variant="h5" component="h1" sx={{ my: 4, fontWeight: 'bold' }}>
              Teacher-related Information
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <Typography>Specialty:</Typography>
                <Typography variant="h5" component="p">
                  {userInfo.specialty}
                </Typography>
              </div>
              <div>
                <Typography>Bio:</Typography>
                <Typography variant="h5" component="p">
                  {userInfo.bio}
                </Typography>
              </div>
              <div>
                <Typography>Description:</Typography>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: userInfo.description || '',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Paper>
      <Modal
        open={isChangePicModalOpen}
        onClose={() => setIsChangePicModalOpen(false)}
        title="Upload a picture"
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={100} />
        ) : (
          <>
            <FileDropzone onFilesSelected={onFilesSelected} />
            <Button
              variant="outlined"
              onClick={() => setIsChangePicModalOpen(false)}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </>
        )}
      </Modal>
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit your information"
      >
        <EditProfile
          userInfo={userInfo}
          countries={countries}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </Modal>
      <Modal
        open={isConfirmRemoveModalOpen}
        onClose={() => setIsConfirmRemoveModalOpen(false)}
        title="Are you sure you want to remove your porfile picture?"
      >
        <ButtonsWrapper>
          <Button variant="outlined" onClick={() => setIsConfirmRemoveModalOpen(false)} fullWidth>
            Cancel
          </Button>
          <Button color="error" onClick={removeProfilePicture} fullWidth>
            Confirm
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Container>
  );
};

export default Profile;
