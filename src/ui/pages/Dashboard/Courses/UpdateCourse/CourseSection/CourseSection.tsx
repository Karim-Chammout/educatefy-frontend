import { useParams } from 'react-router';

const CourseSection = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Section page
      <h1>{id}</h1>
    </div>
  );
};

export default CourseSection;
