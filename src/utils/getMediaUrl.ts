export const getMediaUrl = (key: string) => {
  const S3_PATH_PREFIX = import.meta.env.VITE_S3_PATH_PREFIX;
  const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
  const BUCKET_PATH_NAME_URL = `${S3_PATH_PREFIX}/${S3_BUCKET_NAME}`;

  return `${BUCKET_PATH_NAME_URL}/${key}`;
};
