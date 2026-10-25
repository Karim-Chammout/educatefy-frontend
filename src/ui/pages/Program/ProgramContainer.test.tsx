import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { ProgramDocument } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';

import ProgramContainer from './ProgramContainer';

const programData = {
  __typename: 'Program',
  id: 'p1',
  denomination: 'Full Stack Path',
  slug: 'full-stack-path',
  subtitle: 'From zero to deployment',
  description: null,
  level: 'intermediate',
  image: null,
  updated_at: '2026-02-10',
  created_at: '2026-01-01',
  status: 'not_started',
  enrolledLearnersCount: 42,
  subjects: [{ __typename: 'Subject', id: '1', denomination: 'Web Development' }],
  objectives: [
    { __typename: 'ProgramObjective', id: 'o1', objective: 'Build full-stack applications' },
  ],
  requirements: [],
  instructor: {
    __typename: 'Teacher',
    id: '5',
    first_name: 'Sara',
    last_name: 'Khan',
    avatar_url: null,
    description: null,
    isFollowed: false,
    isAllowedToFollow: false,
    followersCount: 12,
  },
  currentVersion: {
    __typename: 'ProgramVersion',
    id: 'v1',
    version_number: 1,
    courses: [
      {
        __typename: 'Course',
        id: '10',
        denomination: 'React Basics',
        slug: 'react-basics',
        level: 'beginner',
        image: null,
        status: 'available',
        rating: 4.5,
        participationCount: 120,
        progress: null,
        instructor: {
          __typename: 'Teacher',
          id: '7',
          first_name: 'Omar',
          last_name: 'Ali',
          avatar_url: null,
        },
      },
    ],
  },
};

const request = { query: ProgramDocument, variables: { slug: 'full-stack-path' } };
const programMock: MockLink.MockedResponse = {
  request,
  result: { data: { program: programData } },
};

const renderProgram = (apolloMocks: MockLink.MockedResponse[] = [programMock]) =>
  renderWithProviders(
    <Routes>
      <Route path="/program/:programSlug" element={<ProgramContainer />} />
      <Route path="/catalog" element={<p>catalog page</p>} />
    </Routes>,
    { route: '/program/full-stack-path', apolloMocks },
  );

describe('ProgramContainer', () => {
  it('renders the skeleton while loading', () => {
    renderProgram([{ ...programMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Full Stack Path' })).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderProgram([{ request, error: new Error('Network error') }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the not-found state and links back to the catalog', async () => {
    renderProgram([{ request, result: { data: { program: null } } }]);

    expect(await screen.findByRole('heading', { name: 'Program not found' })).toBeVisible();
    expect(screen.getByText('The program you are looking for does not exist.')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Go to Catalog' }));

    expect(await screen.findByText('catalog page')).toBeVisible();
  });

  it('renders the program with its instructor, objective and courses on success', async () => {
    renderProgram();

    expect(await screen.findByRole('heading', { name: 'Full Stack Path' })).toBeVisible();
    expect(screen.getByText('Sara Khan')).toBeVisible();
    expect(screen.getByText('Build full-stack applications')).toBeVisible();
    expect(screen.getByText('React Basics')).toBeVisible();
  });
});
