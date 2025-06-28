import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import {
  AutocompleteElement,
  FieldValues,
  FormContainer,
  SwitchElement,
  TextFieldElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
// @ts-expect-error Cannot find module 'react-hook-form-mui/date-pickers' or its corresponding type declarations.
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import api from '@/api';
import {
  CourseLevel,
  LanguageFragment,
  SubjectFragment,
  useCreateCourseMutation,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button, Typography } from '@/ui/components';
import { FileDropzone, RichTextEditor } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { getMediaUrl } from '@/utils/getMediaUrl';
import { isValidSlug } from '@/utils/isValidSlug';
import { isValidUrl } from '@/utils/isValidUrl';
import { removeHtmlTags } from '@/utils/removeHTMLTags';
import { ServerErrorType } from '@/utils/ServerErrorType';

const CreateCourse = ({
  languages,
  subjectsList,
}: {
  languages: LanguageFragment[];
  subjectsList: SubjectFragment[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [descriptionContent, setDescriptionContent] = useState('');
  const [objectiveItem, setObjectiveItem] = useState('');
  const [objectivesList, setObjectivesList] = useState<null | { id: number; objective: string }[]>(
    null,
  );
  const [requirementItem, setRequirementItem] = useState('');
  const [requirementsList, setRequirementsList] = useState<
    null | { id: number; requirement: string }[]
  >(null);
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [uploadedImageDetails, setUploadedImageDetails] = useState<FileResponseType | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { setToasterVisibility } = useContext(ToasterContext);

  const [createCourse, { loading: createCourseLoading }] = useCreateCourseMutation();

  const { handleSubmit, control, setValue: setFormValue } = useForm();

  const [
    denomination,
    slug,
    subtitle,
    level,
    language,
    subjects,
    externalMeetingLink,
    externalResourceLink,
  ] = useWatch({
    name: [
      'denomination',
      'slug',
      'subtitle',
      'level',
      'language',
      'subjects',
      'externalMeetingLink',
      'externalResourceLink',
    ],
    control,
  });

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      try {
        setIsImageLoading(true);
        setCourseImage(files[0]);

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('destinationFolder', 'course-imgs');

        const uploadedPicture = await api.post<FileResponseType>('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadedPicture.success) {
          setUploadedImageDetails(uploadedPicture);
          setToasterVisibility({
            newDuration: 3000,
            newText: t('courseImage.uploadSuccess'),
            newType: 'success',
          });
        }
      } catch (_error) {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('courseImage.uploadError'),
          newType: 'error',
        });
        setCourseImage(null);
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setCourseImage(null);
    setUploadedImageDetails(null);
  };

  const generateSlug = () => {
    const generatedSlug = denomination
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\u0621-\u064A\w-]+/g, '') // Allow Arabic letters
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    setFormValue('slug', generatedSlug);
  };

  const handleAddObjective = () => {
    if (!objectiveItem || objectiveItem.trim() === '') {
      return;
    }

    const newObjective = {
      id: Date.now() * Math.floor(Math.random() * 1000),
      objective: objectiveItem,
    };

    setObjectivesList((prev) => (prev ? [...prev, newObjective] : [newObjective]));
    setObjectiveItem('');
  };

  const handleDeleteObjective = (id: number) => {
    if (!objectivesList) {
      return;
    }

    const newObjectivesList = objectivesList.filter((item) => item.id !== id);
    setObjectivesList(newObjectivesList);
  };

  const handleAddRequirement = () => {
    if (!requirementItem || requirementItem.trim() === '') {
      return;
    }

    const newRequirement = {
      id: Date.now() * Math.floor(Math.random() * 1000),
      requirement: requirementItem,
    };

    setRequirementsList((prev) => (prev ? [...prev, newRequirement] : [newRequirement]));
    setRequirementItem('');
  };

  const handleDeleteRequirement = (id: number) => {
    if (!requirementsList) {
      return;
    }

    const newRequirementsList = requirementsList.filter((item) => item.id !== id);
    setRequirementsList(newRequirementsList);
  };

  const onSubmit = async (values: FieldValues) => {
    if (!isValidSlug(values.slug)) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.invalidSlug'),
        newType: 'error',
      });

      return;
    }

    const formatedStartDate = values.startDate
      ? format(new Date(values.startDate), 'yyyy-MM-dd')
      : null;
    const formatedEndDate = values.endDate ? format(new Date(values.endDate), 'yyyy-MM-dd') : null;

    if (
      !values.denomination ||
      !values.slug ||
      !values.subtitle ||
      !descriptionContent ||
      !values.level.id ||
      !values.language.id ||
      !values.subjects ||
      values.subjects.length === 0 ||
      !objectivesList ||
      (objectivesList && objectivesList.length === 0) ||
      !requirementsList ||
      (requirementsList && requirementsList.length === 0)
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    const subjectIds = values.subjects.map((subject: { id: string }) => subject.id);
    const objectives = objectivesList.map((item) => item.objective);
    const requirements = requirementsList.map((item) => item.requirement);

    await createCourse({
      variables: {
        courseInfo: {
          denomination: values.denomination,
          slug: values.slug,
          subtitle: values.subtitle,
          description: descriptionContent,
          is_published: values.isPublished ?? false,
          level: values.level.id,
          start_date: formatedStartDate,
          end_date: formatedEndDate,
          language: values.language.id,
          external_resource_link: values.externalCourseLink,
          external_meeting_link: values.externalMeetingLink,
          image:
            uploadedImageDetails?.success && uploadedImageDetails.filePath
              ? uploadedImageDetails.filePath
              : null,
          subjectIds,
          objectives,
          requirements,
        },
      },
      onCompleted(data) {
        if (data.createCourse?.success) {
          const courseId = data.createCourse.course?.id;

          setToasterVisibility({
            newDuration: 3000,
            newText: t('course.createSuccess'),
            newType: 'success',
          });

          navigate(`/dashboard/courses/update/${courseId}`);
        } else if (data.createCourse?.errors[0].message === ServerErrorType.SLUG_ALREADY_TAKEN) {
          setToasterVisibility({
            newDuration: null,
            newText: t('course.slugTaken'),
            newType: 'error',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('course.createError'),
            newType: 'error',
          });
        }
      },
    });
  };

  const hasDescription = removeHtmlTags(descriptionContent);

  const sortedSubjectsList = [...subjectsList].sort((a, b) =>
    a.denomination.localeCompare(b.denomination),
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('courses.createNewCourse')}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard/courses')}>
          {t('common.cancel')}
        </Button>
      </Box>

      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Information Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.basicInfo')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.basicInfoSubtitle')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextFieldElement
                name="denomination"
                label={t('course.name')}
                control={control}
                required
                fullWidth
              />
              <TextFieldElement
                name="subtitle"
                label={t('course.subtitle')}
                helperText={t('course.subtitleHelperText')}
                control={control}
                required
                fullWidth
              />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <TextFieldElement
                  name="slug"
                  label={t('course.slug')}
                  control={control}
                  helperText={
                    slug && !isValidSlug(slug) ? t('form.invalidSlug') : t('course.slugHelperText')
                  }
                  slotProps={{
                    input: {
                      error: slug && !isValidSlug(slug),
                    },
                    formHelperText: {
                      error: slug && !isValidSlug(slug),
                    },
                    inputLabel: {
                      error: slug && !isValidSlug(slug),
                    },
                  }}
                  required
                  fullWidth
                />
                <Button disabled={!denomination} variant="outlined" onClick={generateSlug}>
                  {t('course.generateSlug')}
                </Button>
              </div>
              <AutocompleteElement
                name="language"
                label={t('course.language')}
                textFieldProps={{
                  helperText: t('course.languageHelperText'),
                }}
                control={control}
                options={languages.map((lang) => ({
                  id: lang.code,
                  label: lang.denomination,
                }))}
                autocompleteProps={{
                  groupBy: (option) => option.label[0].toUpperCase(),
                }}
                required
              />
              <AutocompleteElement
                name="subjects"
                label={t('course.subjects')}
                textFieldProps={{
                  helperText: t('course.subjectsHelperText'),
                }}
                control={control}
                options={sortedSubjectsList.map((s) => ({
                  id: s.id,
                  label: s.denomination,
                }))}
                autocompleteProps={{
                  groupBy: (option) => option.label[0].toUpperCase(),
                }}
                multiple
                required
              />
              <TextFieldElement
                name="externalResourceLink"
                label={t('course.externalResourceLink')}
                slotProps={{
                  input: {
                    error: externalResourceLink && !isValidUrl(externalResourceLink),
                  },
                  formHelperText: {
                    error: externalResourceLink && !isValidUrl(externalResourceLink),
                  },
                  inputLabel: {
                    error: externalResourceLink && !isValidUrl(externalResourceLink),
                  },
                }}
                control={control}
                helperText={
                  externalResourceLink && !isValidUrl(externalResourceLink)
                    ? t('form.invalidUrl')
                    : t('course.externalResourceLinkHelperText')
                }
                fullWidth
              />
              <TextFieldElement
                name="externalMeetingLink"
                label={t('course.externalMeetingLink')}
                slotProps={{
                  input: {
                    error: externalMeetingLink && !isValidUrl(externalMeetingLink),
                  },
                  formHelperText: {
                    error: externalMeetingLink && !isValidUrl(externalMeetingLink),
                  },
                  inputLabel: {
                    error: externalMeetingLink && !isValidUrl(externalMeetingLink),
                  },
                }}
                control={control}
                helperText={
                  externalMeetingLink && !isValidUrl(externalMeetingLink)
                    ? t('form.invalidUrl')
                    : t('course.externalMeetingLinkHelperText')
                }
                fullWidth
              />
            </Box>
          </Paper>

          {/* Course Details Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.details')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.detailsSubtitle')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                <FormControlLabel
                  control={
                    <SwitchElement
                      name="isPublished"
                      control={control}
                      label={t('course.publish')}
                    />
                  }
                  label=""
                />
                <Typography variant="body2" color="text.secondary">
                  {t('course.publishHelperText')}
                </Typography>
              </Box>
              <AutocompleteElement
                name="level"
                label={t('course.level')}
                control={control}
                required
                options={Object.values(CourseLevel).map((courseLevel) => ({
                  id: courseLevel,
                  label: t(`course.courseLevel.${courseLevel}`),
                }))}
                autocompleteProps={{
                  fullWidth: true,
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xxs: 'column', md: 'row' },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ flex: 1 }}>
                    <DatePickerElement
                      name="startDate"
                      label={t('course.startDate')}
                      control={control}
                      sx={{ width: '100%' }}
                      disablePast
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <DatePickerElement
                      name="endDate"
                      label={t('course.endDate')}
                      control={control}
                      sx={{ width: '100%' }}
                      disablePast
                    />
                  </Box>
                </LocalizationProvider>
              </Box>
            </Box>
          </Paper>

          {/* Course Description Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.description')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.descriptionSubtitle')}
            </Typography>
            <Box sx={{ minHeight: 200 }}>
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder={t('course.descriptionPlaceholder')}
              />
            </Box>
          </Paper>

          {/* Course Image Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.image')}
            </Typography>
            {courseImage && uploadedImageDetails?.success ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <img
                  src={getMediaUrl(uploadedImageDetails.filePath)}
                  alt={t('course.imageAlt')}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Button size="small" color="error" variant="outlined" onClick={handleRemoveImage}>
                  {t('common.remove')}
                </Button>
              </Box>
            ) : (
              <FileDropzone onFilesSelected={handleFileSelect} disabled={isImageLoading} />
            )}
          </Paper>

          {/* Learning outcomes Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.learningOutcomes')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.learningOutcomesSubtitle')}
            </Typography>
            <Box>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <TextField
                  label={t('course.objective')}
                  value={objectiveItem}
                  onChange={(e) => setObjectiveItem(e.target.value)}
                  helperText={t('course.objectiveHelperText')}
                  required
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleAddObjective}
                  disabled={!objectiveItem || objectiveItem.trim() === ''}
                >
                  {t('common.add')}
                </Button>
              </div>

              {/* Objectives List */}
              {objectivesList && objectivesList.length > 0 && (
                <List>
                  {objectivesList.map((item) => (
                    <Box key={item.id}>
                      <ListItem>
                        <ListItemText primary={item.objective} color="text.secondary" />
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteObjective(item.id)}
                        >
                          X
                        </Button>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              )}
            </Box>
          </Paper>

          {/* Requierments Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.courseRequirements')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.courseRequirementsSubtitle')}
            </Typography>
            <Box>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <TextField
                  label={t('course.requirement')}
                  value={requirementItem}
                  onChange={(e) => setRequirementItem(e.target.value)}
                  helperText={t('course.requirementHelperText')}
                  required
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleAddRequirement}
                  disabled={!requirementItem || requirementItem.trim() === ''}
                >
                  {t('common.add')}
                </Button>
              </div>

              {/* Objectives List */}
              {requirementsList && requirementsList.length > 0 && (
                <List>
                  {requirementsList.map((item) => (
                    <Box key={item.id}>
                      <ListItem>
                        <ListItemText primary={item.requirement} color="text.secondary" />
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteRequirement(item.id)}
                        >
                          X
                        </Button>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              )}
            </Box>
          </Paper>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/dashboard/courses')}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !denomination ||
                !slug ||
                (slug && !isValidSlug(slug)) ||
                !subtitle ||
                !language ||
                !level ||
                (externalResourceLink && !isValidUrl(externalResourceLink)) ||
                (externalMeetingLink && !isValidUrl(externalMeetingLink)) ||
                !subjects ||
                (subjects && subjects.length === 0) ||
                !objectivesList ||
                (objectivesList && objectivesList.length === 0) ||
                !requirementsList ||
                (requirementsList && requirementsList.length === 0) ||
                !hasDescription ||
                isImageLoading ||
                createCourseLoading
              }
            >
              {t('course.createCourseBtn')}
            </Button>
          </div>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default CreateCourse;
