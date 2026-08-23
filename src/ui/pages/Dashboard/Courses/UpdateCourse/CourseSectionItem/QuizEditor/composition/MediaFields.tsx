import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Control, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { QuizQuestionMediaType } from '@/generated/graphql';
import { Typography as Typo } from '@/ui/components';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { ToasterContext } from '@/ui/context';
import { FileResponseType } from '@/types/types';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { QuizFormValues } from './types';
import { mediaAccept } from './constants';

export const QuestionMediaField = ({
  questionIndex,
  control,
  setValue,
}: {
  questionIndex: number;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const mediaUrl = useWatch({ control, name: `questions.${questionIndex}.mediaUrl` });
  const mediaType = useWatch({ control, name: `questions.${questionIndex}.mediaType` });

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('destinationFolder', 'quiz-media');

      const uploaded = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploaded.success) {
        setValue(`questions.${questionIndex}.mediaUrl`, uploaded.filePath);
        setValue(
          `questions.${questionIndex}.mediaType`,
          file.type.startsWith('video/')
            ? QuizQuestionMediaType.Video
            : QuizQuestionMediaType.Image,
        );
        setIsExpanded(false);
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

  const handleRemove = () => {
    setValue(`questions.${questionIndex}.mediaUrl`, null);
    setValue(`questions.${questionIndex}.mediaType`, null);
  };

  return (
    <Box>
      <Typo variant="subtitle2">{t('quiz.questionMedia.label')}</Typo>
      <Box sx={{ mt: 1 }}>
        {mediaUrl ? (
          <>
            <Tooltip title={t('quiz.questionMedia.remove')}>
              <IconButton size="small" color="error" onClick={handleRemove}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ position: 'relative', maxWidth: 320, mt: 1 }}>
              {mediaType === QuizQuestionMediaType.Video ? (
                <Box
                  component="video"
                  src={getMediaUrl(mediaUrl)}
                  controls
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              ) : (
                <Box
                  component="img"
                  src={getMediaUrl(mediaUrl)}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              )}
            </Box>
          </>
        ) : isExpanded ? (
          <Box sx={{ maxWidth: 320 }}>
            <Tooltip title={t('quiz.questionMedia.remove')}>
              <IconButton size="small" onClick={() => setIsExpanded(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <FileDropzone
              onFilesSelected={handleUpload}
              isUploading={isUploading}
              accept={mediaAccept}
            />
          </Box>
        ) : (
          <Tooltip title={t('quiz.questionMedia.add')}>
            <IconButton size="small" onClick={() => setIsExpanded(true)}>
              <AddPhotoAlternateIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export const AnswerImageField = ({
  questionIndex,
  answerIndex,
  control,
  setValue,
}: {
  questionIndex: number;
  answerIndex: number;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = useWatch({
    control,
    name: `questions.${questionIndex}.answers.${answerIndex}.imageUrl`,
  });

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'quiz-media');

      const uploaded = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploaded.success) {
        setValue(`questions.${questionIndex}.answers.${answerIndex}.imageUrl`, uploaded.filePath);
        setIsExpanded(false);
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

  const handleRemove = () => {
    setValue(`questions.${questionIndex}.answers.${answerIndex}.imageUrl`, null);
  };

  return (
    <>
      {imageUrl ? (
        <Tooltip title={t('quiz.answerImage.remove')}>
          <IconButton size="small" color="error" onClick={handleRemove}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : isExpanded ? (
        <Tooltip title={t('quiz.answerImage.remove')}>
          <IconButton size="small" onClick={() => setIsExpanded(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('quiz.answerImage.add')}>
          <IconButton size="small" onClick={() => setIsExpanded(true)}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
      )}
      {imageUrl ? (
        <Box sx={{ mt: 1, maxWidth: 200 }}>
          <Box
            component="img"
            src={getMediaUrl(imageUrl)}
            sx={{ width: '100%', borderRadius: 1 }}
          />
        </Box>
      ) : isExpanded ? (
        <Box sx={{ mt: 1, maxWidth: 320 }}>
          <FileDropzone
            onFilesSelected={handleUpload}
            isUploading={isUploading}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg'],
              'image/webp': ['.webp'],
              'image/gif': ['.gif'],
              'image/svg+xml': ['.svg'],
            }}
          />
        </Box>
      ) : null}
    </>
  );
};
