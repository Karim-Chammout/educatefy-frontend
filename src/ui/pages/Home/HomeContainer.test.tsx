import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { HomeDocument } from '@/generated/graphql';
import { renderWithProviders, screen } from '@/test/wrappers';

import HomeContainer from './HomeContainer';

const progress = {
  __typename: 'CourseProgress',
  completedComponents: 2,
  totalComponents: 5,
  progressPercentage: 40,
  isCompleted: false,
};

const enrolledCourse = {
  __typename: 'Course',
  id: '10',
  denomination: 'React Basics',
  slug: 'react-basics',
  level: 'beginner',
  image: null,
  rating: 4.5,
  participationCount: 120,
  status: 'enrolled',
  progress,
  instructor: {
    __typename: 'Teacher',
    id: '5',
    first_name: 'Sara',
    last_name: 'Khan',
    avatar_url: null,
  },
};

const homeData = {
  enrolledCourses: [enrolledCourse],
  completedCourses: [
    {
      ...enrolledCourse,
      id: '11',
      denomination: 'HTML Fundamentals',
      slug: 'html-fundamentals',
      status: 'completed',
      progress: { ...progress, completedComponents: 5, progressPercentage: 100, isCompleted: true },
    },
  ],
  followingFeedByTeachers: [
    {
      __typename: 'TeacherContent',
      totalCount: 1,
      teacher: {
        __typename: 'Teacher',
        id: '7',
        first_name: 'Omar',
        last_name: 'Ali',
        avatar_url: null,
      },
      items: [
        {
          __typename: 'Course',
          id: '12',
          denomination: 'Design Systems',
          slug: 'design-systems',
          level: 'advanced',
          image: null,
          rating: 4.8,
          participationCount: 300,
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
  ],
  me: {
    __typename: 'Account',
    id: '1',
    statistics: { __typename: 'Statistics', enrolledCoursesCount: 3, completedCoursesCount: 1 },
  },
};

const request = { query: HomeDocument };
const homeMock: MockLink.MockedResponse = { request, result: { data: homeData } };

const renderHome = (apolloMocks: MockLink.MockedResponse[] = [homeMock]) =>
  renderWithProviders(<HomeContainer />, { apolloMocks });

describe('HomeContainer', () => {
  it('renders the skeleton while loading', () => {
    renderHome([{ ...homeMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Hey there!' })).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderHome([{ request, error: new Error('Network error') }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the error placeholder when the current user record is missing', async () => {
    renderHome([{ request, result: { data: { ...homeData, me: null } } }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the greeting, statistics and all three course sections on success', async () => {
    renderHome();

    expect(await screen.findByRole('heading', { name: 'Hey there!' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Continue where you left off' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Your completed content' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'New from your teachers' })).toBeVisible();
    expect(screen.getByText('React Basics')).toBeVisible();
    expect(screen.getByText('Design Systems')).toBeVisible();
  });
});
