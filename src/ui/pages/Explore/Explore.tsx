import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { ExploreQuery } from '@/generated/graphql';
import { CourseCard } from '@/ui/compositions';

const Explore = ({ subjects }: { subjects: ExploreQuery['subjectsListWithLinkedCourses'] }) => {
  return (
    <div>
      <h1>Explore page</h1>
      {subjects.map((subject) => (
        <div key={subject.id}>
          <h2>{subject.denomination}</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
            }}
          >
            {subject.courses.map((course) => (
              <div style={{ flexBasis: '280px' }} key={course.id}>
                <CourseCard
                  difficulty={course.level}
                  rating={course.rating}
                  studentsCount={course.participationCount}
                  slug={course.slug}
                  teacherAvatar={course.instructor.avatar_url || person}
                  teacherName={`${course.instructor.first_name} ${course.instructor.last_name}`}
                  title={course.denomination}
                  image={course.image ?? fallbackImage}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
