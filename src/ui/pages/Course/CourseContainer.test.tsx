import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { CourseDocument } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';

import CourseContainer from './CourseContainer';

const courseData = {
  __typename: 'Course',
  id: '10',
  denomination: 'Algebra 101',
  slug: 'algebra-101',
  subtitle: 'Learn algebra step by step',
  description: null,
  level: 'beginner',
  image: null,
  external_resource_link: null,
  start_date: null,
  end_date: null,
  language: 'English',
  updated_at: '2026-01-15',
  created_at: '2026-01-01',
  status: 'available',
  rating: 4.5,
  ratingsCount: 3,
  participationCount: 120,
  progress: null,
  subjects: [{ __typename: 'Subject', id: '1', denomination: 'Mathematics' }],
  objectives: [],
  requirements: [],
  sections: [
    {
      __typename: 'CourseSection',
      id: 's1',
      denomination: 'Getting started',
      rank: 1,
      items: [
        {
          __typename: 'Lesson',
          id: 'l1',
          itemId: '1',
          denomination: 'First steps',
          duration: 300,
          components: [
            {
              __typename: 'TextContent',
              id: 'c1',
              type: 'text',
              denomination: 'Intro',
              is_published: true,
              is_required: false,
              content: { type: 'doc', content: [{ type: 'paragraph' }] },
              component_id: 'comp-1',
              progress: null,
            },
          ],
        },
      ],
    },
  ],
  reviews: [],
  viewerReview: null,
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
};

const request = { query: CourseDocument, variables: { slug: 'algebra-101' } };

const courseMock: MockLink.MockedResponse = { request, result: { data: { course: courseData } } };

const renderCourse = (apolloMocks: MockLink.MockedResponse[] = [courseMock]) =>
  renderWithProviders(
    <Routes>
      <Route path="/course/:slug" element={<CourseContainer />} />
      <Route path="/catalog" element={<p>catalog page</p>} />
    </Routes>,
    { route: '/course/algebra-101', apolloMocks },
  );

describe('CourseContainer', () => {
  it('renders the skeleton while loading', () => {
    renderCourse([{ ...courseMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Algebra 101' })).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderCourse([{ request, error: new Error('Network error') }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the not-found state and links back to the catalog', async () => {
    renderCourse([{ request, result: { data: { course: null } } }]);

    expect(await screen.findByRole('heading', { name: 'Course not found' })).toBeVisible();
    expect(screen.getByText('The course you are looking for does not exist.')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Go to Catalog' }));

    expect(await screen.findByText('catalog page')).toBeVisible();
  });

  it('renders the course with its instructor, sections and empty reviews on success', async () => {
    renderCourse();

    expect(await screen.findByRole('heading', { name: 'Algebra 101' })).toBeVisible();
    expect(screen.getByText('Sara Khan')).toBeVisible();
    expect(screen.getByText('Getting started')).toBeVisible();
    expect(screen.getByText('No reviews yet')).toBeVisible();
  });
});
