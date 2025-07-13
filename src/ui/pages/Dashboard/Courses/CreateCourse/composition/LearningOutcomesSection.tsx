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

type LearningOutcomesSectionType = {
  formState: FormState;
  formHandlers: FormHandlers;
};

export const LearningOutcomesSection = ({
  formState,
  formHandlers,
}: LearningOutcomesSectionType) => {
  const { t } = useTranslation();
  const { objectiveItem, objectivesList } = formState;
  const { setObjectiveItem, handleAddObjective, handleDeleteObjective } = formHandlers;

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('course.learningOutcomes')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('course.learningOutcomesSubtitle')}
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <TextField
            label={t('course.objective')}
            value={objectiveItem}
            onChange={(e) => setObjectiveItem(e.target.value)}
            helperText={t('course.objectiveHelperText')}
            required
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={handleAddObjective}
            disabled={!objectiveItem || objectiveItem.trim() === ''}
          >
            {t('common.add')}
          </Button>
        </Box>

        {objectivesList && objectivesList.length > 0 && (
          <List>
            {objectivesList.map((item) => (
              <Box key={item.id}>
                <ListItem>
                  <ListItemText primary={item.objective} color="text.secondary" />
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteObjective(item.id)}
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
