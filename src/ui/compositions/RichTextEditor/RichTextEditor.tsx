import { Box, CircularProgress } from '@mui/material';
import 'quill/dist/quill.snow.css';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuill } from 'react-quilljs';

import api from '@/api';
import { useLanguageSelection } from '@/hooks';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { EditorWrapper, LoadingOverlay } from './RichTextEditor.style';

// Supported file types
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/svg+xml',
];

// Define Quill formats
const QUILL_FORMATS = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'align',
  'list',
  'indent',
  'blockquote',
  'code-block',
  'link',
  'image',
  'video',
];

// Define Quill modules with custom handlers
const QUILL_MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
  keyboard: {
    bindings: {
      tab: {
        key: 9,
        handler: () => true, // Prevents default tab behavior
      },
    },
  },
};

type RichTextEditorProps = {
  onChange: Dispatch<SetStateAction<string>>;
  initialValue?: string;
  height?: number;
  placeholder?: string;
  maxFileSize?: number; // in bytes
  onError?: (error: string) => void;
};

const RichTextEditor = ({
  onChange,
  initialValue = '',
  height = 300,
  placeholder,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  onError,
}: RichTextEditorProps) => {
  const { languageDirection } = useLanguageSelection();
  const { t } = useTranslation();
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const { quill, quillRef } = useQuill({
    modules: QUILL_MODULES,
    formats: QUILL_FORMATS,
    placeholder: placeholder || t('richTextEditor.placeholder'),
    theme: 'snow',
  });

  const handleError = useCallback(
    (errorMessage: string) => {
      onError?.(errorMessage);
    },
    [onError],
  );

  const insertToEditor = useCallback(
    (url: string) => {
      if (!quill) return;

      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      quill.insertEmbed(index, 'image', url);
      quill.setSelection(index + 1, 0);
    },
    [quill],
  );

  const uploadImageToServer = useCallback(
    async (file: File) => {
      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        handleError(t('fileDropzone.unsupportedFileType'));

        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        handleError(t('richTextEditor.fileSizeError', { size: maxFileSize / 1024 / 1024 }));

        return;
      }

      if (!quill) return;

      try {
        setIsUploadingImg(true);
        quill.disable();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('destinationFolder', 'text-editor');

        const uploadedimage = await api.post('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        insertToEditor(getMediaUrl(uploadedimage.filePath));
      } catch (_error) {
        handleError(t('richTextEditor.uploadError'));
      } finally {
        setIsUploadingImg(false);
        quill.enable();
      }
    },
    [quill, maxFileSize, handleError, insertToEditor, t],
  );

  const selectLocalImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', ACCEPTED_IMAGE_TYPES.join(','));
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        uploadImageToServer(file);
      }
    };
  }, [uploadImageToServer]);

  // Handle paste events
  useEffect(() => {
    if (!quill) return;

    const handlePaste = (e: ClipboardEvent) => {
      const { clipboardData } = e;
      if (!clipboardData) return;

      const { items } = clipboardData;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file) {
            uploadImageToServer(file);
          }
          break;
        }
      }
    };

    quill.root.addEventListener('paste', handlePaste);

    return () => quill.root.removeEventListener('paste', handlePaste);
  }, [quill]);

  // Initialize editor and set up event handlers
  useEffect(() => {
    if (!quill) return;

    if (initialValue) {
      quill.clipboard.dangerouslyPasteHTML(initialValue);
      // Remove focus after setting initial content
      quill.blur();
    }

    quill.on('text-change', () => {
      onChange(quill.root.innerHTML);
    });

    const toolbar: any = quill.getModule('toolbar');
    toolbar.addHandler('image', selectLocalImage);

    return () => {
      quill.off('text-change');
    };
  }, [quill]);

  return (
    <EditorWrapper languageDirection={languageDirection}>
      <div ref={quillRef} style={{ height }} />

      <LoadingOverlay open={isUploadingImg}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <span>{t('richTextEditor.uploading')}</span>
        </Box>
      </LoadingOverlay>
    </EditorWrapper>
  );
};

export default RichTextEditor;
