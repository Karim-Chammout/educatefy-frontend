import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/components';

import { useComponentContext } from './ComponentContext';

export const ComponentFormModal = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { t } = useTranslation();
  const {
    selectedComponentType,
    baseComponentData,
    componentData,
    updateComponentData,
    updateBaseComponentData,
    createComponent,
    isCreateingComponent,
    updateComponent,
    isUpdatingComponent,
    closeCreateModal,
    closeEditModal,
  } = useComponentContext();

  if (!selectedComponentType) return null;

  const { FormFields } = selectedComponentType;

  const handleClose = () => {
    if (mode === 'create') {
      closeCreateModal();
    } else {
      closeEditModal();
    }
  };

  const handleSave = async () => {
    if (mode === 'create') {
      await createComponent();
    } else {
      await updateComponent();
    }
  };

  const isValid = selectedComponentType.validation(componentData, baseComponentData);

  return (
    <div>
      <div style={{ margin: '16px 0' }}>
        {/* Base Component Fields */}
        <div style={{ marginBottom: '24px' }}>
          <TextField
            label={t('contentComponent.title')}
            value={baseComponentData.denomination}
            onChange={(e) => updateBaseComponentData({ denomination: e.target.value })}
            required
            fullWidth
            margin="normal"
          />

          <div style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={baseComponentData.isPublished}
                    onChange={(e) => updateBaseComponentData({ isPublished: e.target.checked })}
                    title={t('contentComponent.isPublished')}
                  />
                }
                label={t('contentComponent.isPublished')}
              />
              <FormHelperText>{t('contentComponent.isPublishedHint')}</FormHelperText>
            </div>

            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={baseComponentData.isRequired}
                    onChange={(e) => updateBaseComponentData({ isRequired: e.target.checked })}
                    title={t('contentComponent.isRequired')}
                  />
                }
                label={t('contentComponent.isRequired')}
              />
              <FormHelperText>{t('contentComponent.isRequiredHint')}</FormHelperText>
            </div>
          </div>
        </div>

        {/* Component-specific form */}
        <div style={{ marginTop: '24px' }}>
          <FormFields value={componentData} onChange={updateComponentData} />
        </div>
      </div>

      <DialogActions sx={{ padding: '8px 0 !important' }}>
        <Button onClick={handleClose} variant="outlined" fullWidth>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isValid || isCreateingComponent || isUpdatingComponent}
          fullWidth
        >
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </div>
  );
};
