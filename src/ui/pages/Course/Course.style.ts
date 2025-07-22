import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled as MuiStyled } from '@mui/material/styles';
import { Link } from 'react-router';

import { Typography } from '@/ui/components';
import { ThemeType } from '@/ui/theme/theme';
import { max, min } from '@/utils/mediaQuery';

export const CourseHeaderWrapper = styled(Box)`
  display: flex;
  gap: 32px;
  flex-direction: column;

  ${min(
    'md',
    `
      flex-direction: row;
    `,
  )}
`;

export const CourseInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  ${max(
    'md',
    `
      order: 1;
    `,
  )}
`;

export const CourseImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: 200px;
  max-height: 300px;
  border-radius: 4px;
  object-fit: cover;
`;

export const CourseMeta = styled(Box)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const MetaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionTitle = styled(Typography)`
  font-weight: 600;
`;

export const StyledLink = styled('a')(
  ({ theme }: { theme: ThemeType }) => css`
    overflow-wrap: break-word;
    word-break: break-word;
    color: ${theme.colors.primary['500']};
  `,
);

export const SectionWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SubjectsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export const InstructorInfoWrapper = styled(Link)`
  display: inline-flexbox;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: inherit;
`;

export const RatingContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledLinearProgress = MuiStyled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

export const CompletedIndicator = MuiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.success.main,
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));
