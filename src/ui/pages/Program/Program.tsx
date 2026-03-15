import { useEffect } from 'react';

import {
  CourseStatus,
  ProgramFragment,
  ProgramStatus,
  useTrackProgramProgressMutation,
} from '@/generated/graphql';

import { isLoggedIn } from '@/ui/layout/apolloClient';
import { ContentSection, ProgramHeader, ProgramInstructor, ProgramOverview } from './composition';

const THROTTLE_TIME_MS = 30 * 60 * 1000; // 30 minutes

const Program = ({ program }: { program: ProgramFragment }) => {
  const [trackProgramProgress] = useTrackProgramProgressMutation();

  const areAllCoursesCompleted = program.courses.every((c) => c.status === CourseStatus.Completed);

  const shouldMarkProgramComplete =
    areAllCoursesCompleted && program.status !== ProgramStatus.Completed;

  useEffect(() => {
    if (
      isLoggedIn() &&
      (program.status === ProgramStatus.InProgress || shouldMarkProgramComplete)
    ) {
      const lastViewed = sessionStorage.getItem(`lastViewed_${program.id}`);
      const now = Date.now();
      const lastViewedTime = lastViewed ? Number(lastViewed) : 0;
      const timeSinceLastViewed = now - lastViewedTime;

      if (timeSinceLastViewed > THROTTLE_TIME_MS || shouldMarkProgramComplete) {
        trackProgramProgress({
          variables: {
            programId: program.id,
            shouldMarkProgramAsCompleted: shouldMarkProgramComplete,
          },
        }).catch(() => {});
        sessionStorage.setItem(`lastViewed_${program.id}`, now.toString());
      }
    }
  }, [areAllCoursesCompleted, program.id]);

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
