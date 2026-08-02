import { useMutation, useQuery } from '@apollo/client/react';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { formatDistanceToNow } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GetSessionDevicesDocument,
  RevokeAllSessionsDocument,
  RevokeDeviceSessionsDocument,
} from '@/generated/graphql';
import { Button as CustomButton, Modal, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

import InfoSection from '../InfoSection/InfoSection';

const getDeviceIcon = (device: string) => {
  switch (device.toLowerCase()) {
    case 'mobile':
      return <SmartphoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    default:
      return <ComputerIcon />;
  }
};

const SessionsSection = () => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [revokeAllModalOpen, setRevokeAllModalOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery(GetSessionDevicesDocument);
  const [revokeDeviceSessions, { loading: revokeLoading }] = useMutation(
    RevokeDeviceSessionsDocument,
  );
  const [revokeAllSessions, { loading: revokeAllLoading }] = useMutation(RevokeAllSessionsDocument);

  const devices = data?.sessionDevices || [];

  const handleRevokeDevice = async (deviceBrowser: string) => {
    try {
      await revokeDeviceSessions({ variables: { deviceBrowser } });
      refetch();
      setToasterVisibility({
        newDuration: 3000,
        newText: t('profile.deviceRevoked'),
        newType: 'success',
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.sessionRevokeFailed'),
        newType: 'error',
      });
    }
  };

  const handleRevokeAll = async () => {
    try {
      await revokeAllSessions();
      refetch();
      setRevokeAllModalOpen(false);
      setToasterVisibility({
        newDuration: 3000,
        newText: t('profile.allSessionsRevoked'),
        newType: 'success',
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.sessionRevokeFailed'),
        newType: 'error',
      });
    }
  };

  if (loading) {
    return (
      <InfoSection icon={<DevicesIcon color="primary" />} title={t('profile.activeSessions')}>
        <Typography variant="body2" color="text.secondary">
          {t('common.loading')}
        </Typography>
      </InfoSection>
    );
  }

  if (error) {
    return (
      <InfoSection icon={<DevicesIcon color="primary" />} title={t('profile.activeSessions')}>
        <Typography variant="body2" color="text.secondary">
          {t('common.error')}
        </Typography>
      </InfoSection>
    );
  }

  return (
    <>
      <InfoSection icon={<DevicesIcon color="primary" />} title={t('profile.activeSessions')}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('profile.activeSessionsDescription')}
          </Typography>
          {devices.length > 1 && (
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => setRevokeAllModalOpen(true)}
            >
              {t('profile.revokeAllOtherDevices')}
            </Button>
          )}
        </Box>

        <List disablePadding>
          {devices.map((device, index) => (
            <Box key={device.id}>
              <ListItem
                disablePadding
                sx={{
                  py: 2,
                  opacity: revokeLoading ? 0.5 : 1,
                }}
              >
                <ListItemAvatar sx={{ minWidth: 48 }}>
                  {getDeviceIcon(device.device)}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" color="text.primary">
                        {device.browser} on {device.os}
                      </Typography>
                      {device.isCurrentDevice && (
                        <Chip
                          label={t('profile.currentDevice')}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" component="span">
                      {t('profile.lastActive')}{' '}
                      {formatDistanceToNow(new Date(device.last_active), { addSuffix: true })}
                    </Typography>
                  }
                />
                {!device.isCurrentDevice && (
                  <Tooltip title={t('profile.revokeDeviceSessions')}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleRevokeDevice(device.id)}
                      disabled={revokeLoading}
                    >
                      <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                        {t('profile.revoke')}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                )}
              </ListItem>
              {index < devices.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </InfoSection>

      <Modal
        open={revokeAllModalOpen}
        onClose={() => setRevokeAllModalOpen(false)}
        title={t('profile.confirmRevokeAllDevices')}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <CustomButton variant="outlined" onClick={() => setRevokeAllModalOpen(false)} fullWidth>
              {t('common.cancel')}
            </CustomButton>
            <CustomButton
              color="error"
              onClick={handleRevokeAll}
              fullWidth
              disabled={revokeAllLoading}
            >
              {t('profile.revokeAll')}
            </CustomButton>
          </DialogActions>
        }
      >
        <Typography variant="body2" color="text.secondary">
          {t('profile.revokeAllDevicesConfirmMessage')}
        </Typography>
      </Modal>
    </>
  );
};

export default SessionsSection;
