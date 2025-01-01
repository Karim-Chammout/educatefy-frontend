import fallbackImage from '@/assets/background_logo.png';
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
                  rating={4.5} // TO BE ADDED LATER
                  studentsCount={100} // TO BE ADDED LATER
                  slug={course.slug}
                  teacherAvatar="teacher-avatar" // TO BE ADDED LATER
                  teacherName="Teacher Name" // TO BE ADDED LATER
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
