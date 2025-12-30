import { isValidSlug } from '@/utils/isValidSlug';

import { FormState } from './types';

const isValidForm = (formState: FormState) => {
  let isFormDataValid = true;

  if (!formState.denomination) isFormDataValid = false;
  if (!formState.slug) isFormDataValid = false;
  if (formState.slug && !isValidSlug(formState.slug)) isFormDataValid = false;
  if (!formState.subtitle) isFormDataValid = false;
  if (!formState.level) isFormDataValid = false;
  if (!formState.subjects || formState.subjects.length === 0) isFormDataValid = false;
  if (!formState.objectivesList || formState.objectivesList.length === 0) {
    isFormDataValid = false;
  }
  if (!formState.requirementsList || formState.requirementsList.length === 0) {
    isFormDataValid = false;
  }
  if (!formState.hasDescription) isFormDataValid = false;

  return isFormDataValid;
};

export const canSubmitForm = (formState: FormState) => {
  return isValidForm(formState) && !formState.isImageLoading && !formState.createProgramLoading;
};
