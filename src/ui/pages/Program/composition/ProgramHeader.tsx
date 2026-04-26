import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import SchoolIcon from '@mui/icons-material/School';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import fallbackImage from '@/assets/educatefy_background.png';
import { ProgramFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import {
  MetaItem,
  ProgramHeaderWrapper,
  ProgramImage,
  ProgramInfo,
  ProgramMeta,
  SubjectsContainer,
} from '../Program.styles';
import ProgramCTA from './ProgramCTA';

const ProgramHeader = ({ program }: { program: ProgramFragment }) => {
  const { t } = useTranslation();

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <ProgramHeaderWrapper>
        <ProgramInfo>
          <Typography component="h1" variant="h3" gutterBottom>
            {program.denomination}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {program.subtitle}
          </Typography>

          <ProgramMeta>
            <MetaItem>
              <PersonOutlineIcon />
              <Typography variant="body1">
                {program.enrolledLearnersCount} {t('course.students')}
              </Typography>
            </MetaItem>

            <MetaItem>
              <SchoolIcon />
              <Typography variant="body1">{t(`course.courseLevel.${program.level}`)}</Typography>
            </MetaItem>

            <MetaItem>
              <NewReleasesIcon />
              <Typography variant="body1">
                {t('course.lastUpdated')} {format(new Date(program.updated_at), 'M/yyyy')}
              </Typography>
            </MetaItem>
          </ProgramMeta>

          <SubjectsContainer>
            {program.subjects.map((subject) => (
              <Chip
                key={subject.id}
                label={subject.denomination}
                component={Link}
                to={`/subject/${subject.id}`}
                sx={{
                  '&:hover, &:focus': {
                    cursor: 'pointer',
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
              />
            ))}
          </SubjectsContainer>

          <div>
            <ProgramCTA program={program} />
          </div>
        </ProgramInfo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ProgramImage src={program.image || fallbackImage} alt={program.denomination} />
        </div>
      </ProgramHeaderWrapper>
    </Paper>
  );
};

export default ProgramHeader;
