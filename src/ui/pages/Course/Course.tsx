import { CourseFragment } from '@/generated/graphql';

import { CourseHeader, CourseInstructor, CourseOverview, ReviewsList } from './composition';

const Course = ({ courseInfo, userId }: { courseInfo: CourseFragment; userId: string }) => {
  return (
    <div style={{ margin: '16px' }}>
      <CourseHeader courseInfo={courseInfo} />

      <CourseOverview courseInfo={courseInfo} />

      <CourseInstructor courseInfo={courseInfo} userId={userId} />

      <ReviewsList
        reviews={courseInfo.reviews}
        averageRating={courseInfo.rating}
        ratingsCount={courseInfo.ratingsCount}
      />
    </div>
  );
};

export default Course;
