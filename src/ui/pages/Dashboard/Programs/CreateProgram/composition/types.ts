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
  subjects: any[];
  descriptionContent: string;
  objectiveItem: string;
  objectivesList: ObjectiveItem[] | null;
  requirementItem: string;
  requirementsList: RequirementItem[] | null;
  programImage: File | null;
  uploadedImageDetails: any;
  isImageLoading: boolean;
  createProgramLoading: boolean;
  hasDescription: string;
};

export type FormHandlers = {
  setDescriptionContent: React.Dispatch<React.SetStateAction<string>>;
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
