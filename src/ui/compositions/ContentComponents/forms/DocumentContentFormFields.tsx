import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { DocumentContent } from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { FormFieldsProps } from '../types';

export const DocumentContentFormFields = ({ value, onChange }: FormFieldsProps) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const documentData = value as Partial<DocumentContent> | null;
  const [isUploading, setIsUploading] = useState(false);

  const handleDocumentSelection = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'course-components');

      const uploadedDocument = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadedDocument.success) {
        onChange({
          url: uploadedDocument.filePath,
          original_name: uploadedDocument.originalFileName,
          mime_type: uploadedDocument.mimeType,
        });
      }
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <FileDropzone
        onFilesSelected={handleDocumentSelection}
        accept={{ 'application/pdf': ['.pdf'] }}
        isUploading={isUploading}
      />
      {documentData?.url && (
        <div style={{ marginTop: '16px' }}>
          <span>{t('contentComponent.preview')}:</span>
          <div>
            <a
              href={getMediaUrl(documentData.url)}
              target="_blank"
              rel="noopener noreferrer"
              download={documentData.original_name || undefined}
            >
              {documentData.original_name || getMediaUrl(documentData.url)}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
