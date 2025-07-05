import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { CheckBoxWrapper } from './ContentComponent.style';

type BaseComponentStateType = {
  denomination: string;
  isPublished: boolean;
  isRequired: boolean;
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
      <div>
        <CheckBoxWrapper>
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
          <FormHelperText>{t('contentComponent.isPublishedHint')}</FormHelperText>
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <FormControlLabel
            control={
              <Switch
                checked={baseComponent.isRequired}
                onChange={(e) => setBaseComponent({ isRequired: e.target.checked })}
                title={t('contentComponent.isRequired')}
              />
            }
            label={t('contentComponent.isRequired')}
          />
          <FormHelperText>{t('contentComponent.isRequiredHint')}</FormHelperText>
        </CheckBoxWrapper>
      </div>
    </div>
  );
};

export default BaseContentComponent;
