import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { FieldValues, useForm, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import api from '@/api';
import { useCreateCourseMutation } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import { isValidSlug } from '@/utils/isValidSlug';
import { removeHtmlTags } from '@/utils/removeHTMLTags';
import { ServerErrorType } from '@/utils/ServerErrorType';

type ObjectiveItem = {
  id: number;
  objective: string;
};

type RequirementItem = {
  id: number;
  requirement: string;
};

export const useCreateCourseForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToasterVisibility } = useContext(ToasterContext);

  // Form state
  const [descriptionContent, setDescriptionContent] = useState('');
  const [objectiveItem, setObjectiveItem] = useState('');
  const [objectivesList, setObjectivesList] = useState<ObjectiveItem[] | null>(null);
  const [requirementItem, setRequirementItem] = useState('');
  const [requirementsList, setRequirementsList] = useState<RequirementItem[] | null>(null);
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [uploadedImageDetails, setUploadedImageDetails] = useState<FileResponseType | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [createCourse, { loading: createCourseLoading }] = useCreateCourseMutation();
  const { handleSubmit, control, setValue: setFormValue } = useForm();

  const watchedFields = useWatch({
    name: [
      'denomination',
      'slug',
      'subtitle',
      'level',
      'language',
      'subjects',
      'externalResourceLink',
    ],
    control,
  });

  const [denomination, slug, subtitle, level, language, subjects, externalResourceLink] =
    watchedFields;

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
    if (!objectiveItem || objectiveItem.trim() === '') return;

    const newObjective = {
      id: Date.now() * Math.floor(Math.random() * 1000),
      objective: objectiveItem,
    };

    setObjectivesList((prev) => (prev ? [...prev, newObjective] : [newObjective]));
    setObjectiveItem('');
  };

  const handleDeleteObjective = (id: number) => {
    if (!objectivesList) return;
    setObjectivesList(objectivesList.filter((item) => item.id !== id));
  };

  const handleAddRequirement = () => {
    if (!requirementItem || requirementItem.trim() === '') return;

    const newRequirement = {
      id: Date.now() * Math.floor(Math.random() * 1000),
      requirement: requirementItem,
    };

    setRequirementsList((prev) => (prev ? [...prev, newRequirement] : [newRequirement]));
    setRequirementItem('');
  };

  const handleDeleteRequirement = (id: number) => {
    if (!requirementsList) return;
    setRequirementsList(requirementsList.filter((item) => item.id !== id));
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
      objectivesList.length === 0 ||
      !requirementsList ||
      requirementsList.length === 0
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

  const formState = {
    denomination,
    slug,
    subtitle,
    level,
    language,
    subjects,
    externalResourceLink,
    descriptionContent,
    objectiveItem,
    objectivesList,
    requirementItem,
    requirementsList,
    courseImage,
    uploadedImageDetails,
    isImageLoading,
    createCourseLoading,
    hasDescription,
  };

  const formHandlers = {
    setDescriptionContent,
    setObjectiveItem,
    setRequirementItem,
    generateSlug,
    handleFileSelect,
    handleRemoveImage,
    handleAddObjective,
    handleDeleteObjective,
    handleAddRequirement,
    handleDeleteRequirement,
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    ...formHandlers,
  };
};
