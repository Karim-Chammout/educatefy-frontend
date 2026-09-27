import { HomeQuery } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import TeacherRow from './TeacherRow';

type TeachersFeedSectionProps = {
  title: string;
  blocks: HomeQuery['followingFeedByTeachers'];
};

const TeachersFeedSection = ({ title, blocks }: TeachersFeedSectionProps) => {
  return (
    <div style={{ margin: '48px 0' }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>

      {blocks.map((block) => (
        <TeacherRow key={block.teacher.id} teacher={block.teacher} items={block.items} />
      ))}
    </div>
  );
};

export default TeachersFeedSection;
