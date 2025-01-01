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
            newText: 'Course image uploaded successfully!',
            newType: 'success',
          });
        }
      } catch (_error) {
        setToasterVisibility({
          newDuration: 5000,
          newText: 'Failed to upload course image. Please try again later!',
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
        newText: 'Make sure to have a valid slug value!',
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
        newText: 'Make sure to fill out the required form values correctly!',
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
            newText: 'Course updated successfully!',
            newType: 'success',
          });
        } else if (data.updateCourse?.errors[0].message === ServerErrorType.SLUG_ALREADY_TAKEN) {
          setToasterVisibility({
            newDuration: null,
            newText: 'Failed to update course! The slug is already taken, please update it!',
            newType: 'warning',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: 'Failed to update course information. Please try again later!',
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
          Update course
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard/courses')}>
          Cancel
        </Button>
      </Box>

      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Information Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter the core details about your course
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextFieldElement
                name="denomination"
                label="Course Name"
                control={control}
                required
                fullWidth
              />
              <TextFieldElement
                name="slug"
                label="Slug"
                control={control}
                helperText="This will be used in the course URL"
                required
                fullWidth
              />
              <TextFieldElement
                name="subtitle"
                label="Subtitle"
                control={control}
                required
                fullWidth
              />
              <AutocompleteElement
                name="language"
                label="Language"
                textFieldProps={{
                  helperText: 'Select the language of the course',
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
                label="External resource link"
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
                    ? 'Invalid URL'
                    : 'This can be used if you want to add a link to redirect to an external resource.'
                }
                fullWidth
              />
              <TextFieldElement
                name="externalMeetingLink"
                label="External meeting link"
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
                    ? 'Invalid URL'
                    : 'This can be used if you want to add a link to an external meeting.'
                }
                fullWidth
              />
            </Box>
          </Paper>

          {/* Course Details Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Set the difficulty level and schedule
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                <FormControlLabel
                  control={
                    <SwitchElement name="isPublished" control={control} label="Publish Course" />
                  }
                  label=""
                />
                <Typography variant="body2" color="text.secondary">
                  Make this course visible to all users
                </Typography>
              </Box>
              <AutocompleteElement
                name="level"
                label="Level"
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
                      label="Start Date"
                      control={control}
                      sx={{ width: '100%' }}
                      disablePast
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <DatePickerElement
                      name="endDate"
                      label="End Date"
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
              Course Description
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Write a detailed description of your course
            </Typography>
            <Box sx={{ minHeight: 200 }}>
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder="Write your course description here..."
              />
            </Box>
          </Paper>

          {/* Course Image Upload Section */}
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Image
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload or update the image for your course
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
                  alt="Course Preview"
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Button size="small" color="error" variant="outlined" onClick={handleRemoveImage}>
                  Remove Image
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
              Cancel
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
              Update course
            </Button>
          </div>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default UpdateCourse;
