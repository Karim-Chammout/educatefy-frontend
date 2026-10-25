import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router';

import type { MockLink } from '@apollo/client/testing';
import { SubjectDocument } from '@/generated/graphql';
import { renderWithProviders, screen } from '@/test/wrappers';

import SubjectContainer from './SubjectContainer';

const subjectData = {
  __typename: 'Subject',
  id: '1',
  denomination: 'Mathematics',
  courses: [
    {
      __typename: 'Course',
      id: '10',
      denomination: 'Algebra 101',
      slug: 'algebra-101',
      level: 'beginner',
      image: null,
      rating: 4.5,
      participationCount: 120,
      status: 'published',
      progress: null,
      instructor: {
        __typename: 'Account',
        id: '5',
        first_name: 'Sara',
        last_name: 'Khan',
        avatar_url: null,
      },
    },
  ],
  programs: [],
};

const subjectMock: MockLink.MockedResponse = {
  request: { query: SubjectDocument, variables: { id: '1' } },
  result: { data: { subject: subjectData } },
};

const renderSubject = (apolloMocks: MockLink.MockedResponse[] = []) =>
  renderWithProviders(
    <Routes>
      <Route path="/subjects/:id" element={<SubjectContainer />} />
    </Routes>,
    { route: '/subjects/1', apolloMocks },
  );

describe('SubjectContainer', () => {
  it('renders the skeleton while loading', () => {
    renderSubject([{ ...subjectMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Mathematics' })).toBe(null);
  });

  it('renders the subject with its courses on success', async () => {
    renderSubject([subjectMock]);

    expect(await screen.findByRole('heading', { name: 'Mathematics' })).toBeVisible();
    expect(screen.getByText('Algebra 101')).toBeVisible();
  });

  it('renders the error placeholder on query failure', async () => {
    renderSubject([
      {
        request: { query: SubjectDocument, variables: { id: '1' } },
        error: new Error('Network error'),
      },
    ]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the not-found state for a missing subject', async () => {
    renderSubject([
      {
        request: { query: SubjectDocument, variables: { id: '1' } },
        result: { data: { subject: null } },
      },
    ]);

    expect(await screen.findByText('Subject not found')).toBeVisible();
  });
});
