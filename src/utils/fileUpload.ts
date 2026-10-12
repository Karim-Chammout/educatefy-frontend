export const MAX_UPLOAD_FILE_SIZE_MB = 10;
export const MAX_UPLOAD_FILE_SIZE_BYTES = MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024;

type StatusError = {
  status?: number;
  response?: { status?: number };
};

export const isFileTooLargeError = (error: unknown): boolean => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const { status, response } = error as StatusError;

  return status === 413 || response?.status === 413;
};
