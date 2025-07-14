import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { EditableCourseFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

type LearningOutcomesSectionType = {
  objectivesList: EditableCourseFragment['objectives'];
  objectiveItem: string;
  setObjectiveItem: (item: string) => void;
  onAddObjective: () => void;
  onDeleteObjective: (id: string) => void;
};

const LearningOutcomesSection = ({
  objectivesList,
  objectiveItem,
  setObjectiveItem,
  onAddObjective,
  onDeleteObjective,
}: LearningOutcomesSectionType) => {
  const { t } = useTranslation();

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
          <Button variant="outlined" onClick={onAddObjective} disabled={!objectiveItem}>
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
                    onClick={() => onDeleteObjective(item.id)}
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

export default LearningOutcomesSection;
