import { useTranslation } from 'react-i18next';

import { TextContent } from '@/generated/graphql';
import RichTextEditor from '@/ui/compositions/RichTextEditor';

import { FormFieldsProps } from '../types';

export const TextContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const textData = value as Partial<TextContent> | null;

  return (
    <RichTextEditor
      onChange={(content) => onChange({ content })}
      value={textData?.content}
      placeholder={t('course.descriptionPlaceholder')}
    />
  );
};
