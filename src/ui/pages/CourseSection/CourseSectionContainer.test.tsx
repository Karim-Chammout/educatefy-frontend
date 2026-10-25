import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { CourseDocument, CourseStatus } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';

import CourseSectionContainer from './CourseSectionContainer';

const richContent = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Lesson intro' }] }],
};

const lesson = {
  __typename: 'Lesson' as const,
  id: 'l1',
  itemId: '1',
  denomination: 'First steps',
  duration: 300,
  components: [
    {
      __typename: 'TextContent' as const,
      id: 'c1',
      type: 'text',
      denomination: 'Intro',
      is_published: true,
      is_required: false,
      content: richContent,
      component_id: 'comp-1',
      progress: null,
    },
  ],
};

type CourseOverrides = {
  status?: CourseStatus;
  sectionId?: string;
  items?: (typeof lesson)[];
};

const makeCourse = ({ status, sectionId, items }: CourseOverrides = {}) => ({
  __typename: 'Course' as const,
  id: '10',
  denomination: 'Algebra 101',
  slug: 'algebra-101',
  status: status ?? CourseStatus.Enrolled,
  sections: [
    {
      __typename: 'CourseSection' as const,
      id: sectionId ?? 's1',
      denomination: 'Getting started',
      rank: 1,
      items: items ?? [lesson],
    },
  ],
});

const request = { query: CourseDocument, variables: { slug: 'algebra-101' } };

const courseMock = (course: ReturnType<typeof makeCourse>): MockLink.MockedResponse => ({
  request,
  result: { data: { course } },
});

const defaultRoute = '/course/algebra-101/section/s1/item/l1';

const renderSection = (apolloMocks: MockLink.MockedResponse[], route = defaultRoute) =>
  renderWithProviders(
    <Routes>
      <Route
        path="/course/:slug/section/:sectionId/item/:itemId"
        element={<CourseSectionContainer />}
      />
      <Route path="/course/:slug" element={<p>course page</p>} />
    </Routes>,
    { route, apolloMocks },
  );

describe('CourseSectionContainer', () => {
  it('renders the skeleton while loading', () => {
    renderSection([{ ...courseMock(makeCourse()), delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByText('Lesson intro')).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderSection([{ request, error: new Error('Network error') }]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('redirects to the course page when the viewer is not enrolled', async () => {
    renderSection([courseMock(makeCourse({ status: CourseStatus.Available }))]);

    expect(await screen.findByText('course page')).toBeVisible();
  });

  it('renders the section-not-found state and goes back to the course', async () => {
    renderSection([courseMock(makeCourse())], '/course/algebra-101/section/s9/item/l1');

    expect(await screen.findByRole('heading', { name: 'Section not found' })).toBeVisible();
    expect(screen.getByText('This course section does not exist')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Back to course' }));

    expect(await screen.findByText('course page')).toBeVisible();
  });

  it('renders the empty-section state when the section has no items', async () => {
    renderSection([courseMock(makeCourse({ items: [] }))]);

    expect(
      await screen.findByRole('heading', { name: 'No content available in this section' }),
    ).toBeVisible();
    expect(screen.getByText('Stay tuned! More content will be added soon.')).toBeVisible();
  });

  it('renders the item-not-found state for an unknown item', async () => {
    renderSection([courseMock(makeCourse())], '/course/algebra-101/section/s1/item/ghost');

    expect(await screen.findByRole('heading', { name: 'Item not found' })).toBeVisible();
    expect(screen.getByText('This section item does not exist')).toBeVisible();
  });

  it('renders the lesson content with its action buttons on success', async () => {
    renderSection([courseMock(makeCourse())]);

    expect(await screen.findByText('Lesson intro')).toBeVisible();
    // The sidebar is viewport-dependent (jsdom reports a mobile viewport), so only
    // assert that the item is listed, not that it is visible.
    expect(screen.getByText('First steps')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete' })).toBeVisible();
  });
});
