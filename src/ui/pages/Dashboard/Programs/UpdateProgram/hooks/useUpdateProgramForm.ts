import { useContext, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { EditableProgramFragment } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import { getMediaUrl } from '@/utils/getMediaUrl';
import { isValidSlug } from '@/utils/isValidSlug';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

type UseUpdateProgramFormType = {
  program: EditableProgramFragment;
  descriptionContent: string;
};

export const useUpdateProgramForm = ({ program, descriptionContent }: UseUpdateProgramFormType) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [currentImage, setCurrentImage] = useState<string | null>(program.image || null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [objectiveItem, setObjectiveItem] = useState('');
  const [objectivesList, setObjectivesList] = useState<EditableProgramFragment['objectives']>(
    program.objectives,
  );
  const [requirementItem, setRequirementItem] = useState('');
  const [requirementsList, setRequirementsList] = useState<EditableProgramFragment['requirements']>(
    program.requirements,
  );

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      try {
        setIsImageLoading(true);

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('destinationFolder', 'program-imgs');

        const uploadedPicture = await api.post<FileResponseType>('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadedPicture.success) {
          setCurrentImage(getMediaUrl(uploadedPicture.filePath));
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
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
  };

  const handleAddObjective = () => {
    if (!objectiveItem || objectiveItem.trim() === '') {
      return;
    }

    const newObjective: {
      __typename: 'ProgramObjective';
      id: string;
      objective: string;
    } = {
      __typename: 'ProgramObjective',
      id: `${Date.now() * Math.floor(Math.random() * 1000)}`,
      objective: objectiveItem,
    };

    setObjectivesList((prev) => [...prev, newObjective]);
    setObjectiveItem('');
  };

  const handleDeleteObjective = (id: string) => {
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

    const newRequirement: {
      __typename: 'ProgramRequirement';
      id: string;
      requirement: string;
    } = {
      __typename: 'ProgramRequirement',
      id: `${Date.now() * Math.floor(Math.random() * 1000)}`,
      requirement: requirementItem,
    };

    setRequirementsList((prev) => [...prev, newRequirement]);
    setRequirementItem('');
  };

  const handleDeleteRequirement = (id: string) => {
    if (!requirementsList) {
      return;
    }

    const newRequirementsList = requirementsList.filter((item) => item.id !== id);
    setRequirementsList(newRequirementsList);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      denomination: program.denomination,
      subtitle: program.subtitle,
      slug: program.slug,
      level: program.level,
      subjects: program.subjects || null,
      isPublished: program.is_published,
    },
  });

  const watchedValues = useWatch({
    control,
    name: ['denomination', 'subtitle', 'slug', 'level', 'subjects'],
  });

  const [denomination, subtitle, slug, level, subjects] = watchedValues;

  const hasDescription = removeHtmlTags(descriptionContent);

  const isFormValid = !!(
    denomination &&
    slug &&
    isValidSlug(slug) &&
    subtitle &&
    level &&
    subjects &&
    subjects.length > 0 &&
    objectivesList.length > 0 &&
    requirementsList.length > 0 &&
    hasDescription
  );

  const validateAndSubmit = (onSubmit: (values: any) => void) => async (values: any) => {
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
      !values.level ||
      !values.subjects ||
      values.subjects.length === 0
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    onSubmit(values);
  };

  return {
    control,
    handleSubmit: (onSubmit: (values: any) => void) => handleSubmit(validateAndSubmit(onSubmit)),
    watchedValues: {
      denomination,
      subtitle,
      slug,
      level,
      subjects,
    },
    isFormValid,
    currentImage,
    isImageLoading,
    handleFileSelect,
    handleRemoveImage,
    objectivesList,
    objectiveItem,
    setObjectiveItem,
    handleAddObjective,
    handleDeleteObjective,
    requirementsList,
    requirementItem,
    setRequirementItem,
    handleAddRequirement,
    handleDeleteRequirement,
  };
};
