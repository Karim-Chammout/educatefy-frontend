import CheckIcon from '@mui/icons-material/Check';
import LinkIcon from '@mui/icons-material/Link';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import { CourseFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { MetaItem, SectionTitle } from '../Course.style';
import CourseSections from './CourseSections';

const CourseOverview = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const { t } = useTranslation();

  return (
    <>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <SectionTitle component="h3" variant="h6">
          {t('course.description')}
        </SectionTitle>
        <Typography dangerouslySetInnerHTML={{ __html: courseInfo.description }} />
      </Paper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        {courseInfo.objectives.length > 0 && (
          <Paper variant="outlined" sx={{ p: 3, flex: '1 1 auto' }}>
            <SectionTitle component="h3" variant="h6">
              {t('course.courseObjectives')}
            </SectionTitle>
            <List>
              {courseInfo.objectives.map((item) => (
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
        {courseInfo.requirements.length > 0 && (
          <Paper variant="outlined" sx={{ p: 3, flex: '1 1 auto' }}>
            <SectionTitle component="h3" variant="h6">
              {t('course.courseRequirements')}
            </SectionTitle>
            <List>
              {courseInfo.requirements.map((item) => (
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

      {courseInfo.external_resource_link && (
        <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
          <SectionTitle component="h3" variant="h6" gutterBottom>
            {t('course.externalResourceLink')}
          </SectionTitle>
          <MetaItem>
            <LinkIcon color="action" />
            <Typography variant="body1">
              <a
                href={courseInfo.external_resource_link}
                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {courseInfo.external_resource_link}
              </a>
            </Typography>
          </MetaItem>
        </Paper>
      )}

      {courseInfo.sections.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
          <CourseSections sections={courseInfo.sections} slug={courseInfo.slug} />
        </Paper>
      )}
    </>
  );
};

export default CourseOverview;
