import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import { ProgramFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { SectionTitle } from '../Program.styles';

const ProgramOverview = ({ program }: { program: ProgramFragment }) => {
  console.log('🚀 ~ :16 ~ program ======> ', program);

  const { t } = useTranslation();

  return (
    <>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <SectionTitle component="h3" variant="h6">
          {t('common.description')}
        </SectionTitle>
        <Typography dangerouslySetInnerHTML={{ __html: program.description }} />
      </Paper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        {program.objectives.length > 0 && (
          <Paper variant="outlined" sx={{ p: 3, flex: '1 1 auto' }}>
            <SectionTitle component="h3" variant="h6">
              {t('programs.programObjectives')}
            </SectionTitle>
            <List>
              {program.objectives.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  disablePadding
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <CheckIcon sx={{ fontSize: '16px' }} color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item.objective} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
        {program.requirements.length > 0 && (
          <Paper variant="outlined" sx={{ p: 3, flex: '1 1 auto' }}>
            <SectionTitle component="h3" variant="h6">
              {t('programs.programRequirements')}
            </SectionTitle>
            <List>
              {program.requirements.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  disablePadding
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <PriorityHighIcon sx={{ fontSize: '16px' }} color="error" />
                  </ListItemIcon>
                  <ListItemText primary={item.requirement} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </>
  );
};

export default ProgramOverview;
