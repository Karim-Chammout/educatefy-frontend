import { CourseFragment } from '@/generated/graphql';

import { CourseHeader, CourseInstructor, CourseOverview, ReviewsList } from './composition';

const Course = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <CourseHeader courseInfo={courseInfo} />

      <CourseOverview courseInfo={courseInfo} />

      <CourseInstructor courseInfo={courseInfo} />

      <ReviewsList
        reviews={courseInfo.reviews}
        averageRating={courseInfo.rating}
        ratingsCount={courseInfo.ratingsCount}
      />
    </div>
  );
};

export default Course;
