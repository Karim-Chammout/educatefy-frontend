import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import PlaceholderExtension from '@tiptap/extension-placeholder';
import TextAlignExtension from '@tiptap/extension-text-align';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

import IframeExtension from './IframeExtension';
import { EditorWrapper } from './RichTextEditor.style';
import Toolbar from './Toolbar';

type RichTextEditorProps = {
  value?: JSONContent | null;
  onChange?: (value: JSONContent) => void;
  placeholder?: string;
  uploadEndpoint?: string;
  disabled?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  label?: string;
  error?: string;
  helperText?: string;
};

const DEFAULT_UPLOAD_ENDPOINT = '/api/file/upload';

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write something…',
  uploadEndpoint = DEFAULT_UPLOAD_ENDPOINT,
  disabled = false,
  minHeight,
  maxHeight,
  label,
  error,
  helperText,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // code block is included in StarterKit
        codeBlock: {},
      }),
      ImageExtension.configure({
        allowBase64: false,
        inline: false,
        resize: {
          enabled: true,
          directions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          minWidth: 50,
          minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      PlaceholderExtension.configure({
        placeholder,
      }),
      TextAlignExtension.configure({
        types: ['heading', 'paragraph'],
      }),
      IframeExtension,
    ],
    content: value ?? null,
    editable: !disabled,
    onUpdate({ editor: updatedEditor }) {
      onChange?.(updatedEditor.getJSON());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (!editor) return;
    const currentJson = JSON.stringify(editor.getJSON());
    const incomingJson = JSON.stringify(value ?? null);
    if (currentJson !== incomingJson) {
      editor.commands.setContent(value ?? null, { emitUpdate: false });
    }
  }, [value, editor]);

  // Sync disabled state
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  return (
    <Box>
      {label && (
        <FormLabel error={Boolean(error)} sx={{ display: 'block', mb: 0.5 }}>
          {label}
        </FormLabel>
      )}

      <EditorWrapper
        hasError={Boolean(error)}
        minHeight={minHeight}
        maxHeight={maxHeight}
        disabled={disabled}
      >
        {editor && <Toolbar editor={editor} uploadEndpoint={uploadEndpoint} disabled={disabled} />}
        <EditorContent editor={editor} />
      </EditorWrapper>

      {(error || helperText) && (
        <FormHelperText error={Boolean(error)} sx={{ mx: 2, mt: '4px' }}>
          {error ?? helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default RichTextEditor;
