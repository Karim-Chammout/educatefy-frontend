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

type RequirementsSectionType = {
  requirementsList: EditableCourseFragment['requirements'];
  requirementItem: string;
  setRequirementItem: (item: string) => void;
  onAddRequirement: () => void;
  onDeleteRequirement: (id: string) => void;
};

const RequirementsSection = ({
  requirementsList,
  requirementItem,
  setRequirementItem,
  onAddRequirement,
  onDeleteRequirement,
}: RequirementsSectionType) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('course.courseRequirements')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('course.courseRequirementsSubtitle')}
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <TextField
            label={t('course.requirement')}
            value={requirementItem}
            onChange={(e) => setRequirementItem(e.target.value)}
            helperText={t('course.requirementHelperText')}
            required
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={onAddRequirement}
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
                    onClick={() => onDeleteRequirement(item.id)}
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

export default RequirementsSection;
