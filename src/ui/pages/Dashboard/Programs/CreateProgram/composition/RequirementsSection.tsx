import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@/ui/components';

import { FormHandlers, FormState } from './types';

export const RequirementsSection = ({
  formState,
  formHandlers,
}: {
  formState: FormState;
  formHandlers: FormHandlers;
}) => {
  const { t } = useTranslation();
  const { requirementItem, requirementsList } = formState;
  const { setRequirementItem, handleAddRequirement, handleDeleteRequirement } = formHandlers;

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('program.programRequirements')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('program.programRequirementsSubtitle')}
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <TextField
            label={t('program.requirement')}
            value={requirementItem}
            onChange={(e) => setRequirementItem(e.target.value)}
            helperText={t('program.requirementHelperText')}
            required
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={handleAddRequirement}
            disabled={!requirementItem || requirementItem.trim() === ''}
          >
            {t('common.add')}
          </Button>
        </Box>

        {requirementsList && requirementsList.length > 0 && (
          <List>
            {requirementsList.map((item) => (
              <Box key={item.id}>
                <ListItem>
                  <ListItemText primary={item.requirement} color="text.secondary" />
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteRequirement(item.id)}
                  >
                    X
                  </Button>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};
