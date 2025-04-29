import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

type BaseComponentStateType = {
  denomination: string;
  isPublished: boolean;
};

const BaseContentComponent = ({
  baseComponent,
  setBaseComponent,
}: {
  baseComponent: BaseComponentStateType;
  setBaseComponent: (value: Partial<BaseComponentStateType>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <TextField
        label={t('contentComponent.title')}
        value={baseComponent.denomination}
        onChange={(e) => setBaseComponent({ denomination: e.target.value })}
        required
        fullWidth
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          margin: '16px 0 16px 8px',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={baseComponent.isPublished}
              onChange={(e) => setBaseComponent({ isPublished: e.target.checked })}
              title={t('contentComponent.isPublished')}
            />
          }
          label={t('contentComponent.isPublished')}
        />
      </div>
    </div>
  );
};

export default BaseContentComponent;
