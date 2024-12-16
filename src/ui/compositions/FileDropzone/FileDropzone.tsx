import { useCallback } from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';

type FileDropzoneType = {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Accept;
  disabled?: boolean;
} & DropzoneOptions;

const FileDropzone = ({
  onFilesSelected,
  maxFiles = 1,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
  },
  disabled = false,
  ...rest
}: FileDropzoneType) => {
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
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive && !isDragReject ? (
        <p>Drop the files here...</p>
      ) : isDragReject ? (
        <p>This file type is not supported</p>
      ) : (
        <p>{disabled ? 'Dropzone is disabled' : 'Drag & drop a file, or click to select'}</p>
      )}
    </div>
  );
};

export default FileDropzone;
