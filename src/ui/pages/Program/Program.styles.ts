import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Link } from 'react-router';

import { Typography } from '@/ui/components';
import { max, min } from '@/utils/mediaQuery';

export const ProgramHeaderWrapper = styled(Box)`
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

export const ProgramInfo = styled(Box)`
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

export const ProgramMeta = styled(Box)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const RatingContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MetaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SubjectsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export const ProgramImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: 200px;
  max-height: 300px;
  border-radius: 4px;
  object-fit: cover;
`;

export const SectionTitle = styled(Typography)`
  font-weight: 600;
`;

export const InstructorInfoWrapper = styled(Link)`
  display: inline-flexbox;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: inherit;
`;
