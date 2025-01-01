import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
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
  EditableCourseFragment,
  LanguageFragment,
  useUpdateCourseMutation,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button, Typography } from '@/ui/components';
import { FileDropzone, RichTextEditor } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { ServerErrorType } from '@/utils/ServerErrorType';
import { isValidSlug } from '@/utils/isValidSlug';
import { isValidUrl } from '@/utils/isValidUrl';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

const UpdateCourse = ({
  course,
  languages,
}: {
  course: EditableCourseFragment;
  languages: LanguageFragment[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [descriptionContent, setDescriptionContent] = useState(course.description);
  const [currentImage, setCurrentImage] = useState<string | null>(course.image || null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { setToasterVisibility } = useContext(ToasterContext);
  const [updateCourse, { loading: updateCourseLoading }] = useUpdateCourseMutation();

  const S3_PATH_PREFIX = import.meta.env.VITE_S3_PATH_PREFIX;
  const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
  const BUCKET_PATH_NAME_URL = `${S3_PATH_PREFIX}/${S3_BUCKET_NAME}`;

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      try {
        setIsImageLoading(true);

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('destinationFolder', 'course-imgs');

        const uploadedPicture = await api.post<FileResponseType>('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadedPicture.success) {
          setCurrentImage(`${BUCKET_PATH_NAME_URL}/${uploadedPicture.filePath}`);
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
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      denomination: course.denomination,
      subtitle: course.subtitle,
      slug: course.slug,
      level: course.level,
      language: languages.find((lang) => lang.denomination === course.language)?.code || null,
      externalResourceLink: course.external_resource_link || null,
      externalMeetingLink: course.external_meeting_link || null,
      isPublished: course.is_published,
      startDate: course.start_date || null,
      endDate: course.start_date || null,
    },
  });

  const [denomination, subtitle, slug, level, language, externalMeetingLink, externalResourceLink] =
    useWatch({
      name: [
        'denomination',
        'slug',
        'subtitle',
        'level',
        'language',
        'externalMeetingLink',
        'externalResourceLink',
      ],
      control,
    });

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
      !values.level
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    // TODO: Fix the following workaround in a better way:
    // Slice out the BUCKET_PATH_NAME_URL from the updatedImage
    // so that we can send it to the server to update
    const imageToUpdate = currentImage
      ? currentImage.substring(BUCKET_PATH_NAME_URL.length + 1)
      : null;

    await updateCourse({
      variables: {
        updateCourseInfo: {
          id: course.id,
          denomination: values.denomination,
          slug: values.slug,
          subtitle: values.subtitle,
          description: descriptionContent,
          is_published: values.isPublished ?? false,
          level: values.level?.id || values.level,
          start_date: formatedStartDate,
          end_date: formatedEndDate,
          external_resource_link: values.externalResourceLink,
          external_meeting_link: values.externalMeetingLink,
          image: imageToUpdate,
        },
      },
      onCompleted(data) {
        if (data.updateCourse?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('course.updateSuccess'),
            newType: 'success',
          });
        } else if (data.updateCourse?.errors[0].message === ServerErrorType.SLUG_ALREADY_TAKEN) {
          setToasterVisibility({
            newDuration: null,
            newText: t('course.slugTaken'),
            newType: 'error',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('course.updateError'),
            newType: 'error',
          });
        }
      },
    });
  };

  const hasDescription = removeHtmlTags(descriptionContent);

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
          {t('course.updateTitle')}
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
                name="slug"
                label={t('course.slug')}
                control={control}
                helperText={t('course.slugHelperText')}
                required
                fullWidth
              />
              <TextFieldElement
                name="subtitle"
                label={t('course.subtitle')}
                control={control}
                required
                fullWidth
              />
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
                required
              />
              <TextFieldElement
                name="externalResourceLink"
                label={t('course.externalResourceLink')}
                slotProps={{
                  input: {
                    error: !!(externalResourceLink && !isValidUrl(externalResourceLink)),
                  },
                  formHelperText: {
                    error: !!(externalResourceLink && !isValidUrl(externalResourceLink)),
                  },
                  inputLabel: {
                    error: !!(externalResourceLink && !isValidUrl(externalResourceLink)),
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
                    error: !!(externalMeetingLink && !isValidUrl(externalMeetingLink)),
                  },
                  formHelperText: {
                    error: !!(externalMeetingLink && !isValidUrl(externalMeetingLink)),
                  },
                  inputLabel: {
                    error: !!(externalMeetingLink && !isValidUrl(externalMeetingLink)),
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
                  label: courseLevel,
                }))}
                autocompleteProps={{
                  fullWidth: true,
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
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

          {/* Course Image Upload Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('course.image')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('course.imageSubtitle')}
            </Typography>

            {currentImage !== null ? (
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
                  src={currentImage}
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
                !hasDescription ||
                isImageLoading ||
                updateCourseLoading
              }
            >
              {t('common.update')}
            </Button>
          </div>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default UpdateCourse;
