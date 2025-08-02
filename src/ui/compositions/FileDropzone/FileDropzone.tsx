import { useCallback } from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

type FileDropzoneType = {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Accept;
  disabled?: boolean;
  isUploading?: boolean;
} & DropzoneOptions;

const FileDropzone = ({
  onFilesSelected,
  maxFiles = 1,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
  },
  disabled = false,
  isUploading = false,
  ...rest
}: FileDropzoneType) => {
  const { t } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    disabled,
    ...rest,
  });

  const getBorderColor = () => {
    if (isDragReject) return 'red';
    if (isDragActive) return 'green';

    return '#007bff';
  };

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${getBorderColor()}`,
        padding: '20px',
        textAlign: 'center',
        cursor: disabled || isUploading ? 'not-allowed' : 'pointer',
        backgroundColor: '#fafafa',
        color: '#333',
        opacity: disabled || isUploading ? 0.5 : 1,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive && !isDragReject ? (
        <p>{t('fileDropzone.dropHere')}</p>
      ) : isDragReject ? (
        <p>{t('fileDropzone.unsupportedFileType')}</p>
      ) : (
        <p>
          {disabled
            ? t('fileDropzone.disabled')
            : isUploading
              ? t('common.uploading')
              : t('fileDropzone.dragOrClick')}
        </p>
      )}
    </div>
  );
};

export default FileDropzone;
