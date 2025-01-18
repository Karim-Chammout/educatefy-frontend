import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router';

const styledLink = ({ theme, isCurrent }: { theme: Theme; isCurrent?: boolean }) => css`
  text-decoration: none;
  color: ${isCurrent ? 'inherit' : theme.colors.blue};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isCurrent',
})<{ isCurrent?: boolean }>(styledLink);
