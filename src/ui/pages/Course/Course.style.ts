import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const courseImageStyles = css`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const courseTitleStyles = css`
  margin-top: 16px;
  font-weight: bold;
`;

const courseSubtitleStyles = css`
  margin-top: 8px;
  color: gray;
`;

const courseDescriptionStyles = css`
  margin-top: 16px;
  line-height: 1.6;
`;

const courseDetailsStyles = css`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const courseSubjectsStyles = css`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CourseImage = styled('img')(courseImageStyles);
export const CourseTitle = styled(Typography)(courseTitleStyles);
export const CourseSubtitle = styled(Typography)(courseSubtitleStyles);
export const CourseDescription = styled('div')(courseDescriptionStyles);
export const CourseDetails = styled('div')(courseDetailsStyles);
export const CourseSubjects = styled('div')(courseSubjectsStyles);
