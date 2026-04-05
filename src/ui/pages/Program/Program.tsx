import { ProgramFragment } from '@/generated/graphql';

import { ContentSection, ProgramHeader, ProgramInstructor, ProgramOverview } from './composition';

const Program = ({ program }: { program: ProgramFragment }) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <ProgramHeader program={program} />

      <ProgramOverview program={program} />

      <ContentSection program={program} />

      <ProgramInstructor program={program} />
    </div>
  );
};

export default Program;
