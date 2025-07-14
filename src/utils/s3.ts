export const getS3FilePathFromUrl = (key: string): string | null => {
  const S3_PATH_PREFIX = import.meta.env.VITE_S3_PATH_PREFIX;
  const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;

  const prefix = `${S3_PATH_PREFIX}/${S3_BUCKET_NAME}/`;

  return key.startsWith(prefix) ? key.slice(prefix.length) : null;
};
