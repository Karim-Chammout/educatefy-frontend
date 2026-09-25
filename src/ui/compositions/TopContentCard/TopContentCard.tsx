import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { CatalogCourseFragment, CatalogProgramFragment } from '@/generated/graphql';
import { ContentCard } from '@/ui/compositions';
import { getTeacherPath } from '@/utils/getTeacherPath';

type TopContentCardItem =
  | (CatalogCourseFragment & { __typename: 'Course' })
  | (CatalogProgramFragment & { __typename: 'Program' });

const TopContentCard = ({ item }: { item: TopContentCardItem }) => {
  if (item.__typename === 'Course') {
    return (
      <ContentCard
        type="course"
        title={item.denomination}
        linkPath={`/course/${item.slug}`}
        teacherName={`${item.instructor.first_name} ${item.instructor.last_name}`}
        teacherAvatar={item.instructor.avatar_url || person}
        teacherLink={getTeacherPath(item.instructor.id)}
        image={item.image || fallbackImage}
        difficulty={item.level}
        rating={item.rating}
        studentsCount={item.participationCount}
      />
    );
  }

  return (
    <ContentCard
      type="program"
      title={item.denomination}
      linkPath={`/program/${item.slug}`}
      teacherName={`${item.instructor.first_name} ${item.instructor.last_name}`}
      teacherAvatar={item.instructor.avatar_url || person}
      teacherLink={getTeacherPath(item.instructor.id)}
      image={item.image || fallbackImage}
      difficulty={item.level}
      studentsCount={item.enrolledLearnersCount}
      coursesCount={item.currentVersion.courses.length}
    />
  );
};

export default TopContentCard;
