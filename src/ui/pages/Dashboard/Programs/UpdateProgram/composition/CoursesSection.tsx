import { useMutation } from '@apollo/client/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PublishIcon from '@mui/icons-material/Publish';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import {
  CreateProgramVersionDocument,
  EditableProgramDocument,
  ProgramCourseFragment,
  ProgramVersionCourseEntryFragment,
  ProgramVersionStatus,
  PublishProgramVersionDocument,
  UpdateProgramVersionCoursesDocument,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

import DraggableCourseItem from './DraggableCourseItem';

type PrerequisiteMap = Record<string, string | null>;

type CoursesSectionType = {
  programId: string;
  availableCourses: ProgramCourseFragment[];
  initialCourseEntries: ProgramVersionCourseEntryFragment[];
  versionStatus:
    | ProgramVersionStatus.Draft
    | ProgramVersionStatus.Published
    | ProgramVersionStatus.Archived;
  versionNumber: number;
};

// Extracts just the course objects from entries, preserving rank order
const toCourseList = (entries: ProgramVersionCourseEntryFragment[]): ProgramCourseFragment[] =>
  [...entries].sort((a, b) => a.rank - b.rank).map((e) => e.course);

// Builds a prerequisiteMap from entries
const toPrerequisiteMap = (entries: ProgramVersionCourseEntryFragment[]): PrerequisiteMap =>
  Object.fromEntries(entries.map((e) => [e.course.id, e.prerequisiteCourseId ?? null]));

const hasPrerequisiteCycle = (courses: ProgramCourseFragment[], prereqMap: PrerequisiteMap) => {
  const map = courses.reduce<Map<string, string>>((acc, course) => {
    const prereq = prereqMap[course.id];
    if (prereq) acc.set(course.id, prereq);

    return acc;
  }, new Map());

  const visited = new Set<string>();
  const inStack = new Set<string>();

  const dfs = (id: string) => {
    if (inStack.has(id)) return true;
    if (visited.has(id)) return false;

    visited.add(id);
    inStack.add(id);

    const next = map.get(id);
    if (next !== undefined && dfs(next)) return true;
    inStack.delete(id);

    return false;
  };

  return [...map.keys()].some((id) => dfs(id));
};

const CoursesSection = ({
  programId,
  availableCourses,
  initialCourseEntries,
  versionStatus,
  versionNumber,
}: CoursesSectionType) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const isLocked = versionStatus !== ProgramVersionStatus.Draft;

  const [committedCourses, setCommittedCourses] = useState<ProgramCourseFragment[]>(() =>
    toCourseList(initialCourseEntries),
  );
  const [committedPrereqMap, setCommittedPrereqMap] = useState<PrerequisiteMap>(() =>
    toPrerequisiteMap(initialCourseEntries),
  );

  const [draftCourses, setDraftCourses] = useState<ProgramCourseFragment[]>([]);
  const [draftPrereqMap, setDraftPrereqMap] = useState<PrerequisiteMap>({});
  const [prereqCycleError, setPrereqCycleError] = useState<string | null>(null);
  const [draftSelectedCourse, setDraftSelectedCourse] = useState<ProgramCourseFragment | null>(
    null,
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isNewVersionDialogOpen, setIsNewVersionDialogOpen] = useState(false);
  const [infoAnchorEl, setInfoAnchorEl] = useState<HTMLButtonElement | null>(null);

  // version_number === 1 and draft means no published version has ever existed.
  // version_number > 1 and draft means a published version exists and this is a pending update.
  const hasPublishedVersion = versionStatus !== ProgramVersionStatus.Draft || versionNumber > 1;

  const contextualStatusMessage = (() => {
    if (versionStatus === ProgramVersionStatus.Draft && !hasPublishedVersion) {
      return { text: t('program.statusNeverPublished'), severity: 'warning' as const };
    }

    if (versionStatus === ProgramVersionStatus.Draft && hasPublishedVersion) {
      return {
        text: t('program.statusDraftWithPublished', { version: versionNumber - 1 }),
        severity: 'info' as const,
      };
    }

    return { text: t('program.statusPublishedActive'), severity: 'success' as const };
  })();

  const [updateProgramVersionCourses, { loading: saveLoading }] = useMutation(
    UpdateProgramVersionCoursesDocument,
  );
  const [publishProgramVersion, { loading: publishLoading }] = useMutation(
    PublishProgramVersionDocument,
  );
  const [createProgramVersion, { loading: createVersionLoading }] = useMutation(
    CreateProgramVersionDocument,
    {
      refetchQueries: [{ query: EditableProgramDocument, variables: { id: programId } }],
    },
  );

  const handleOpenEditModal = () => {
    setDraftCourses([...committedCourses]);
    setDraftPrereqMap({ ...committedPrereqMap });
    setDraftSelectedCourse(null);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setPrereqCycleError(null);
  };

  const handleDraftAddCourse = () => {
    if (!draftSelectedCourse || draftCourses.find((c) => c.id === draftSelectedCourse.id)) return;
    setDraftCourses((prev) => [...prev, draftSelectedCourse]);
    setDraftPrereqMap((prev) => ({ ...prev, [draftSelectedCourse.id]: null }));
    setDraftSelectedCourse(null);
    setPrereqCycleError(null);
  };

  const handleDraftRemoveCourse = (courseId: string) => {
    setDraftCourses((prev) => prev.filter((c) => c.id !== courseId));
    setDraftPrereqMap((prev) => {
      const updated = Object.fromEntries(
        Object.entries(prev)
          .filter(([id]) => id !== courseId)
          .map(([id, prereqId]) => [id, prereqId === courseId ? null : prereqId]),
      );

      return updated;
    });
    setPrereqCycleError(null);
  };

  const handleDraftPrerequisiteChange = (courseId: string, prereqId: string | null) => {
    setPrereqCycleError(null);

    const candidate = { ...draftPrereqMap, [courseId]: prereqId };
    if (prereqId !== null && hasPrerequisiteCycle(draftCourses, candidate)) {
      setPrereqCycleError(t('program.prerequisiteCycleError'));
    }

    setDraftPrereqMap((prev) => ({ ...prev, [courseId]: prereqId }));
  };

  const moveDraftItem = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setDraftCourses((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over?.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);

        return reordered;
      });
    }
  };

  const handleSave = async () => {
    if (hasPrerequisiteCycle(draftCourses, draftPrereqMap)) {
      setPrereqCycleError(t('program.prerequisiteCycleError'));

      return;
    }

    await updateProgramVersionCourses({
      variables: {
        updateProgramVersionCoursesInfo: {
          programId,
          courses: draftCourses.map((course, index) => ({
            courseId: course.id,
            rank: index + 1,
            prerequisiteCourseId: draftPrereqMap[course.id] ?? null,
          })),
        },
      },
      onCompleted(data) {
        if (data.updateProgramVersionCourses?.success) {
          setCommittedCourses([...draftCourses]);
          setCommittedPrereqMap({ ...draftPrereqMap });
          setIsEditModalOpen(false);
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.coursesSaveSuccess'),
            newType: 'success',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.coursesSaveError'),
            newType: 'error',
          });
        }
      },
    });

    setPrereqCycleError(null);
  };

  const handlePublishConfirm = async () => {
    setIsPublishDialogOpen(false);
    await publishProgramVersion({
      variables: { programId },
      onCompleted(data) {
        if (data.publishProgramVersion?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.publishSuccess'),
            newType: 'success',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.publishError'),
            newType: 'error',
          });
        }
      },
    });
  };

  const handleCreateNewVersionConfirm = async () => {
    setIsNewVersionDialogOpen(false);
    await createProgramVersion({
      variables: { programId },
      onCompleted(data) {
        if (data.createProgramVersion?.success) {
          const newEntries = data.createProgramVersion.programVersion?.courseEntries ?? [];
          const newCourses = toCourseList(newEntries);
          const newPrereqMap = toPrerequisiteMap(newEntries);

          setCommittedCourses(newCourses);
          setCommittedPrereqMap(newPrereqMap);

          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.newVersionSuccess'),
            newType: 'success',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.newVersionError'),
            newType: 'error',
          });
        }
      },
    });
  };

  const unselectedDraftCourses = availableCourses.filter(
    (course) => !draftCourses.find((dc) => dc.id === course.id),
  );

  return (
    <>
      <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="h6">{t('program.courses')}</Typography>
              <IconButton
                size="small"
                onClick={(e) => setInfoAnchorEl(e.currentTarget)}
                sx={{ color: 'text.secondary' }}
              >
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
              <Popover
                open={Boolean(infoAnchorEl)}
                anchorEl={infoAnchorEl}
                onClose={() => setInfoAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{ paper: { sx: { p: 2.5, maxWidth: 380 } } }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {t('program.versioningInfoTitle')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('program.versioningInfoBody')}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {t('program.versioningInfoStudentTitle')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('program.versioningInfoStudentBody')}
                </Typography>
              </Popover>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={`${t('program.version')} ${versionNumber}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={t(`program.versionStatus.${versionStatus}`)}
                size="small"
                color={versionStatus === ProgramVersionStatus.Draft ? 'warning' : 'success'}
                icon={isLocked ? <LockIcon sx={{ fontSize: 14 }} /> : undefined}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isLocked && (
              <>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpenEditModal}>
                  {t('program.manageCourses')}
                </Button>
                <Button
                  startIcon={<PublishIcon />}
                  disabled={committedCourses.length === 0 || publishLoading}
                  onClick={() => setIsPublishDialogOpen(true)}
                >
                  {t('program.publishVersion')}
                </Button>
              </>
            )}
            {isLocked && (
              <Button
                variant="outlined"
                disabled={createVersionLoading}
                onClick={() => setIsNewVersionDialogOpen(true)}
              >
                {t('program.createNewVersion')}
              </Button>
            )}
          </Box>
        </Box>

        <Alert severity={contextualStatusMessage.severity} sx={{ mb: 2 }}>
          {contextualStatusMessage.text}
        </Alert>

        {committedCourses.length > 0 ? (
          <List sx={{ p: 0 }}>
            {committedCourses.map((course, index) => (
              <Box
                key={course.id}
                sx={{
                  mb: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mr: 2,
                      minWidth: 28,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {index + 1}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1 }}>
                    <img
                      src={course.image || fallbackImage}
                      alt="Course img"
                      style={{ height: '48px', width: '48px', borderRadius: 4 }}
                    />
                    <ListItemText
                      primary={course.denomination}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={t(`course.courseLevel.${course.level}`)}
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: '11px' }}
                          />
                          {committedPrereqMap[course.id] && (
                            <Chip
                              label={`${t('program.prerequisite')}: ${
                                committedCourses.find((c) => c.id === committedPrereqMap[course.id])
                                  ?.denomination ?? '—'
                              }`}
                              size="small"
                              color="info"
                              variant="outlined"
                              sx={{ fontSize: '11px' }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
              </Box>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              p: 4,
              textAlign: 'center',
              border: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
              bgcolor: 'action.hover',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t('program.noCoursesSelected')}
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('program.manageCoursesTitle')}
            <Chip
              label={`${t('program.version')} ${versionNumber}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Autocomplete
              fullWidth
              options={unselectedDraftCourses}
              value={draftSelectedCourse}
              onChange={(_, newValue) => setDraftSelectedCourse(newValue)}
              getOptionLabel={(option) => option.denomination}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <img
                      src={option.image || fallbackImage}
                      alt="Course img"
                      style={{ height: '40px', width: '40px' }}
                    />
                    <div>
                      <Typography variant="body2">{option.denomination}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(option.updated_at), 'd/M/yyyy')}
                      </Typography>
                    </div>
                  </Box>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('program.selectCourse')}
                  placeholder={t('program.searchCourse')}
                  size="small"
                />
              )}
              noOptionsText={t('program.noCourses')}
            />
            <Button
              onClick={handleDraftAddCourse}
              disabled={!draftSelectedCourse}
              startIcon={<AddIcon />}
              sx={{ minWidth: 100 }}
            >
              {t('common.add')}
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {prereqCycleError && (
            <Alert severity="error" onClose={() => setPrereqCycleError(null)} sx={{ mb: 2 }}>
              {prereqCycleError}
            </Alert>
          )}

          {draftCourses.length > 0 ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('program.selectedCourses')} ({draftCourses.length})
                </Typography>
                <Chip
                  label={t('common.dragToReorder')}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '10px' }}
                />
              </Box>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={moveDraftItem}
              >
                <SortableContext
                  items={draftCourses.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <List sx={{ p: 0 }}>
                    {draftCourses.map((course) => (
                      <DraggableCourseItem
                        key={course.id}
                        course={course}
                        otherCourses={draftCourses.filter((c) => c.id !== course.id)}
                        prerequisiteCourseId={draftPrereqMap[course.id] ?? null}
                        onPrerequisiteChange={handleDraftPrerequisiteChange}
                        onRemove={handleDraftRemoveCourse}
                      />
                    ))}
                  </List>
                </SortableContext>
              </DndContext>
            </Box>
          ) : (
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                border: 2,
                borderStyle: 'dashed',
                borderColor: 'divider',
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {t('program.noCoursesSelected')}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseEditModal} variant="outlined" disabled={saveLoading}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={saveLoading || prereqCycleError !== null}>
            {t('common.saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isPublishDialogOpen} onClose={() => setIsPublishDialogOpen(false)}>
        <DialogTitle>{t('program.publishVersionTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('program.publishVersionConfirm')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPublishDialogOpen(false)} variant="outlined">
            {t('common.cancel')}
          </Button>
          <Button onClick={handlePublishConfirm}>{t('program.publish')}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isNewVersionDialogOpen} onClose={() => setIsNewVersionDialogOpen(false)}>
        <DialogTitle>{t('program.newVersionTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('program.newVersionConfirm')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewVersionDialogOpen(false)} variant="outlined">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleCreateNewVersionConfirm} disabled={createVersionLoading}>
            {t('program.createNewVersion')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CoursesSection;
