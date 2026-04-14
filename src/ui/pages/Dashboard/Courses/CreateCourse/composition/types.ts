import { JSONContent } from '@tiptap/react';
import { Dispatch, SetStateAction } from 'react';

type ObjectiveItem = {
  id: number;
  objective: string;
};

type RequirementItem = {
  id: number;
  requirement: string;
};

export type FormState = {
  denomination: string;
  slug: string;
  subtitle: string;
  level: any;
  language: any;
  subjects: any[];
  externalResourceLink: string;
  descriptionContent: JSONContent | null;
  objectiveItem: string;
  objectivesList: ObjectiveItem[] | null;
  requirementItem: string;
  requirementsList: RequirementItem[] | null;
  courseImage: File | null;
  uploadedImageDetails: any;
  isImageLoading: boolean;
  createCourseLoading: boolean;
  hasDescription: boolean;
};

export type FormHandlers = {
  setDescriptionContent: Dispatch<SetStateAction<JSONContent | null>>;
  setObjectiveItem: (item: string) => void;
  setRequirementItem: (item: string) => void;
  generateSlug: () => void;
  handleFileSelect: (files: File[]) => Promise<void>;
  handleRemoveImage: () => void;
  handleAddObjective: () => void;
  handleDeleteObjective: (id: number) => void;
  handleAddRequirement: () => void;
  handleDeleteRequirement: (id: number) => void;
};
