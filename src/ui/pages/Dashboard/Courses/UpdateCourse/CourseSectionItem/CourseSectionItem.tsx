import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

import { SectionFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { StyledLink } from '../CourseSections/CourseSections.style';

type ItemType = SectionFragment['items'][0];

const CourseSectionItem = ({
  sectionItem,
  sectionDenomination,
  courseId,
  sectionId,
}: {
  sectionItem: ItemType;
  sectionDenomination: string;
  courseId?: string;
  sectionId?: string;
}) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Breadcrumbs>
        <StyledLink to={`/dashboard/courses/update/${courseId}`}>
          {t('courseSection.backToCourse')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections`}>
          {t('courseSection.sections')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections/${sectionId}`}>
          {sectionDenomination}
        </StyledLink>
        <StyledLink
          to={`/dashboard/courses/update/${courseId}/sections/${sectionId}/item/${sectionItem.itemId}`}
          isCurrent
        >
          {sectionItem.denomination}
        </StyledLink>
      </Breadcrumbs>

      <Box sx={{ mt: 2 }}>
        <Typography component="h1" variant="h3">
          {sectionItem.denomination}
        </Typography>
      </Box>
    </Container>
  );
};

export default CourseSectionItem;
