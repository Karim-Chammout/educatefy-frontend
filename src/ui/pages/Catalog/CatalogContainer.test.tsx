import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { CatalogDocument } from '@/generated/graphql';
import { renderWithProviders, screen } from '@/test/wrappers';
import { ToasterContext, ToasterProvider } from '@/ui/context';
import { PERMISSION_DENIED } from '@/utils/constants';

import CatalogContainer from './CatalogContainer';

const catalogData = {
  subjectsWithLinkedContent: [{ __typename: 'Subject', id: '1', denomination: 'Mathematics' }],
  teachers: {
    __typename: 'TeachersPaginatedResult',
    items: [
      {
        __typename: 'Teacher',
        id: '5',
        first_name: 'Sara',
        last_name: 'Khan',
        avatar_url: null,
        followersCount: 12,
        subjects: [{ __typename: 'Subject', id: '1', denomination: 'Mathematics' }],
      },
    ],
  },
  topContent: {
    __typename: 'ContentPaginatedResult',
    items: [
      {
        __typename: 'Course',
        id: '10',
        denomination: 'Algebra 101',
        slug: 'algebra-101',
        level: 'beginner',
        image: null,
        rating: 4.5,
        participationCount: 120,
        instructor: {
          __typename: 'Teacher',
          id: '5',
          first_name: 'Sara',
          last_name: 'Khan',
          avatar_url: null,
        },
      },
    ],
  },
};

const catalogMock: MockLink.MockedResponse = {
  request: { query: CatalogDocument, variables: { teachersFirst: 4, topContentFirst: 8 } },
  result: { data: catalogData },
};

const renderCatalog = (
  apolloMocks: MockLink.MockedResponse[] = [catalogMock],
  route: string | { pathname: string; state?: unknown } = '/',
) =>
  renderWithProviders(
    <Routes>
      <Route path="/" element={<CatalogContainer />} />
    </Routes>,
    { route, apolloMocks },
  );

const ToasterProbe = () => {
  const { isVisible, text } = useContext(ToasterContext);

  return isVisible ? <p role="status">{text}</p> : null;
};

describe('CatalogContainer', () => {
  it('renders the skeleton while loading', () => {
    renderCatalog([{ ...catalogMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Catalog' })).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderCatalog([{ request: catalogMock.request, error: new Error('Network error') }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('shows the permission-denied toaster when redirected from a teacher-only page', async () => {
    renderWithProviders(
      <ToasterProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CatalogContainer />
                <ToasterProbe />
              </>
            }
          />
        </Routes>
      </ToasterProvider>,
      {
        route: { pathname: '/', state: { action: PERMISSION_DENIED } },
        apolloMocks: [catalogMock],
      },
    );

    expect(await screen.findByRole('status')).toHaveTextContent(
      "You don't have permission to access this page",
    );
  });

  it('renders the subjects, teachers and top content sections on success', async () => {
    renderCatalog();

    expect(await screen.findByRole('heading', { name: 'Catalog' })).toBeVisible();
    expect(screen.getAllByText('Mathematics').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sara Khan').length).toBeGreaterThan(0);
    expect(screen.getByText('Algebra 101')).toBeVisible();
  });
});
