import { useContext, useState } from 'react';
import { FieldValues, useForm, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import api from '@/api';
import { useCreateProgramMutation } from '@/generated/graphql';
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

export const useCreateProgramForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [descriptionContent, setDescriptionContent] = useState('');
  const [objectiveItem, setObjectiveItem] = useState('');
  const [objectivesList, setObjectivesList] = useState<ObjectiveItem[] | null>(null);
  const [requirementItem, setRequirementItem] = useState('');
  const [requirementsList, setRequirementsList] = useState<RequirementItem[] | null>(null);
  const [programImage, setProgramImage] = useState<File | null>(null);
  const [uploadedImageDetails, setUploadedImageDetails] = useState<FileResponseType | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [createProgram, { loading: createProgramLoading }] = useCreateProgramMutation();
  const { handleSubmit, control, setValue: setFormValue } = useForm();

  const watchedFields = useWatch({
    name: ['denomination', 'slug', 'subtitle', 'level', 'subjects'],
    control,
  });

  const [denomination, slug, subtitle, level, subjects] = watchedFields;

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      try {
        setIsImageLoading(true);
        setProgramImage(files[0]);

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('destinationFolder', 'program-imgs');

        const uploadedPicture = await api.post<FileResponseType>('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadedPicture.success) {
          setUploadedImageDetails(uploadedPicture);
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.imgUploadSuccess'),
            newType: 'success',
          });
        }
      } catch (_error) {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('program.imgUploadError'),
          newType: 'error',
        });
        setProgramImage(null);
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setProgramImage(null);
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

    if (
      !values.denomination ||
      !values.slug ||
      !values.subtitle ||
      !descriptionContent ||
      !values.level.id ||
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

    await createProgram({
      variables: {
        programInfo: {
          denomination: values.denomination,
          slug: values.slug,
          subtitle: values.subtitle,
          description: descriptionContent,
          is_published: values.isPublished ?? false,
          level: values.level.id,
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
        if (data.createProgram?.success) {
          const programId = data.createProgram.program?.id;
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.createSuccess'),
            newType: 'success',
          });
          navigate(`/dashboard/programs/update/${programId}`);
        } else if (data.createProgram?.errors[0].message === ServerErrorType.SLUG_ALREADY_TAKEN) {
          setToasterVisibility({
            newDuration: null,
            newText: t('program.slugTaken'),
            newType: 'error',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.createError'),
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
    subjects,
    descriptionContent,
    objectiveItem,
    objectivesList,
    requirementItem,
    requirementsList,
    programImage,
    uploadedImageDetails,
    isImageLoading,
    createProgramLoading,
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
