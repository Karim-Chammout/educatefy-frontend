import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpgradeToLatestProgramVersionMutation } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

const VersionUpgradeBanner = ({ programId }: { programId: string }) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [isDismissed, setIsDismissed] = useState(false);

  const [upgradeToLatestProgramVersion, { loading }] = useUpgradeToLatestProgramVersionMutation();

  if (isDismissed) {
    return null;
  }

  const handleUpgrade = async () => {
    await upgradeToLatestProgramVersion({
      variables: { programId },
      onCompleted(data) {
        if (data.upgradeToLatestProgramVersion?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.upgradeSuccess'),
            newType: 'success',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.upgradeError'),
            newType: 'error',
          });
        }
      },
    });
  };

  return (
    <Alert severity="info" icon={<AutoAwesomeIcon fontSize="small" />} sx={{ mb: 2 }}>
      <AlertTitle>{t('program.upgradeAvailableTitle')}</AlertTitle>
      {t('program.upgradeAvailableBody')}
      <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
        <Button
          size="small"
          variant="contained"
          color="info"
          disabled={loading}
          onClick={handleUpgrade}
        >
          {t('program.upgradeAction')}
        </Button>
        <Button
          size="small"
          variant="outlined"
          disabled={loading}
          onClick={() => setIsDismissed(true)}
        >
          {t('program.upgradeStayOnCurrent')}
        </Button>
      </Box>
    </Alert>
  );
};

export default VersionUpgradeBanner;
