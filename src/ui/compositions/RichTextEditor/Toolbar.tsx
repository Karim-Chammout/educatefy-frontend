import CodeIcon from '@mui/icons-material/Code';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import RedoIcon from '@mui/icons-material/Redo';
import TitleIcon from '@mui/icons-material/Title';
import UndoIcon from '@mui/icons-material/Undo';
import WebIcon from '@mui/icons-material/Web';
import {
  CircularProgress,
  IconButton,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Editor } from '@tiptap/react';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import api from '@/api';
import { FileResponseType } from '@/types/types';
import { Button } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ToolbarDivider, ToolbarWrapper } from './RichTextEditor.style';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

type ToolbarProps = {
  editor: Editor;
  uploadEndpoint: string;
  disabled?: boolean;
};

type ToolbarButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

const ToolbarButton = ({ label, onClick, active, disabled, children }: ToolbarButtonProps) => {
  return (
    <Tooltip title={label} placement="top" arrow>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          color={active ? 'primary' : 'default'}
          sx={{
            borderRadius: 1,
            width: 28,
            height: 28,
            backgroundColor: active ? 'primary.main' : 'transparent',
            color: active ? 'primary.contrastText' : 'text.primary',
            '&:hover': {
              backgroundColor: active ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

const Toolbar = ({ editor, uploadEndpoint, disabled }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Popovers
  const [linkAnchor, setLinkAnchor] = useState<HTMLElement | null>(null);
  const [linkUrl, setLinkUrl] = useState('');

  const [iframeAnchor, setIframeAnchor] = useState<HTMLElement | null>(null);
  const [iframeUrl, setIframeUrl] = useState('');

  const [imageUrlAnchor, setImageUrlAnchor] = useState<HTMLElement | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  // ─── Image upload ────────────────────────────────────────────────
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    if (!file) return;

    setImageError(null);

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setImageError('Only image files are allowed (JPEG, PNG, GIF, WebP, SVG).');

      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setImageError('Image must be smaller than 5MB.');

      return;
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('destinationFolder', 'text-editor');

      const response = await api.post<FileResponseType>(uploadEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.success) {
        editor
          .chain()
          .focus()
          .setImage({ src: getMediaUrl(response.filePath) })
          .run();
      } else {
        setImageError(response.message ?? 'Upload failed.');
      }
    } catch {
      setImageError('Upload failed. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleInsertImageUrl = useCallback(() => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    }
    setImageUrl('');
    setImageUrlAnchor(null);
  }, [editor, imageUrl]);

  // ─── Link ────────────────────────────────────────────────────────
  const handleOpenLink = (e: MouseEvent<HTMLButtonElement>) => {
    const existing = editor.getAttributes('link').href ?? '';
    setLinkUrl(existing);
    setLinkAnchor(e.currentTarget);
  };

  const handleCloseLinkPopover = () => setLinkAnchor(null);

  const handleInsertLink = useCallback(() => {
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl.trim(), target: '_blank' }).run();
    }
    setLinkUrl('');
    setLinkAnchor(null);
  }, [editor, linkUrl]);

  const handleLinkUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
  };

  const handleLinkKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleInsertLink();
  };

  // ─── Image URL popover ───────────────────────────────────────────
  const handleOpenImageUrl = (e: MouseEvent<HTMLButtonElement>) => {
    setImageUrlAnchor(e.currentTarget);
  };

  const handleCloseImageUrlPopover = () => setImageUrlAnchor(null);

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleImageUrlKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleInsertImageUrl();
  };

  // ─── Iframe ──────────────────────────────────────────────────────
  const handleOpenIframe = (e: MouseEvent<HTMLButtonElement>) => {
    setIframeAnchor(e.currentTarget);
  };

  const handleCloseIframePopover = () => setIframeAnchor(null);

  const handleInsertIframe = useCallback(() => {
    if (iframeUrl.trim()) {
      editor.chain().focus().setIframe({ src: iframeUrl.trim() }).run();
    }
    setIframeUrl('');
    setIframeAnchor(null);
  }, [editor, iframeUrl]);

  const handleIframeUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIframeUrl(e.target.value);
  };

  const handleIframeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleInsertIframe();
  };

  // ─── Editor commands ─────────────────────────────────────────────
  const handleUndo = () => editor.chain().focus().undo().run();
  const handleRedo = () => editor.chain().focus().redo().run();
  const handleH1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const handleH2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const handleH3 = () => editor.chain().focus().toggleHeading({ level: 3 }).run();
  const handleBold = () => editor.chain().focus().toggleBold().run();
  const handleItalic = () => editor.chain().focus().toggleItalic().run();
  const handleStrike = () => editor.chain().focus().toggleStrike().run();
  const handleCode = () => editor.chain().focus().toggleCode().run();
  const handleAlignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const handleAlignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const handleAlignRight = () => editor.chain().focus().setTextAlign('right').run();
  const handleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const handleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const handleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const handleHorizontalRule = () => editor.chain().focus().setHorizontalRule().run();

  return (
    <ToolbarWrapper>
      {/* History */}
      <ToolbarButton label="Undo" onClick={handleUndo} disabled={disabled || !editor.can().undo()}>
        <UndoIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={handleRedo} disabled={disabled || !editor.can().redo()}>
        <RedoIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        label="Heading 1"
        onClick={handleH1}
        active={editor.isActive('heading', { level: 1 })}
        disabled={disabled}
      >
        <Typography variant="caption" fontWeight={700} lineHeight={1}>
          H1
        </Typography>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        onClick={handleH2}
        active={editor.isActive('heading', { level: 2 })}
        disabled={disabled}
      >
        <Typography variant="caption" fontWeight={700} lineHeight={1}>
          H2
        </Typography>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        onClick={handleH3}
        active={editor.isActive('heading', { level: 3 })}
        disabled={disabled}
      >
        <Typography variant="caption" fontWeight={700} lineHeight={1}>
          H3
        </Typography>
      </ToolbarButton>

      <ToolbarDivider />

      {/* Inline marks */}
      <ToolbarButton
        label="Bold"
        onClick={handleBold}
        active={editor.isActive('bold')}
        disabled={disabled}
      >
        <FormatBoldIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        onClick={handleItalic}
        active={editor.isActive('italic')}
        disabled={disabled}
      >
        <FormatItalicIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        onClick={handleStrike}
        active={editor.isActive('strike')}
        disabled={disabled}
      >
        <FormatStrikethroughIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Inline Code"
        onClick={handleCode}
        active={editor.isActive('code')}
        disabled={disabled}
      >
        <CodeIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        label="Align Left"
        onClick={handleAlignLeft}
        active={editor.isActive({ textAlign: 'left' })}
        disabled={disabled}
      >
        <FormatAlignLeftIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Align Center"
        onClick={handleAlignCenter}
        active={editor.isActive({ textAlign: 'center' })}
        disabled={disabled}
      >
        <FormatAlignCenterIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Align Right"
        onClick={handleAlignRight}
        active={editor.isActive({ textAlign: 'right' })}
        disabled={disabled}
      >
        <FormatAlignRightIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists & blocks */}
      <ToolbarButton
        label="Bullet List"
        onClick={handleBulletList}
        active={editor.isActive('bulletList')}
        disabled={disabled}
      >
        <FormatListBulletedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered List"
        onClick={handleOrderedList}
        active={editor.isActive('orderedList')}
        disabled={disabled}
      >
        <FormatListNumberedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label="Blockquote"
        onClick={handleBlockquote}
        active={editor.isActive('blockquote')}
        disabled={disabled}
      >
        <FormatQuoteIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton label="Divider" onClick={handleHorizontalRule} disabled={disabled}>
        <HorizontalRuleIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Link */}
      <ToolbarButton
        label="Insert Link"
        onClick={handleOpenLink}
        active={editor.isActive('link')}
        disabled={disabled}
      >
        <InsertLinkIcon fontSize="small" />
      </ToolbarButton>

      {/* Image — file upload */}
      <Tooltip title={imageUploading ? 'Uploading…' : 'Upload Image'} placement="top" arrow>
        <span>
          <IconButton
            size="small"
            disabled={disabled || imageUploading}
            onClick={handleClickUpload}
            sx={{ borderRadius: 1, width: 28, height: 28 }}
          >
            {imageUploading ? <CircularProgress size={14} /> : <ImageIcon fontSize="small" />}
          </IconButton>
        </span>
      </Tooltip>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Image — by URL */}
      <ToolbarButton label="Image by URL" onClick={handleOpenImageUrl} disabled={disabled}>
        <TitleIcon fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
      </ToolbarButton>

      {/* iFrame embed */}
      <ToolbarButton
        label="Embed (YouTube, Vimeo, URL…)"
        onClick={handleOpenIframe}
        disabled={disabled}
      >
        <WebIcon fontSize="small" />
      </ToolbarButton>

      {/* ── Popovers ── */}

      {/* Link popover */}
      <Popover
        open={Boolean(linkAnchor)}
        anchorEl={linkAnchor}
        onClose={handleCloseLinkPopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Insert Link</Typography>
          <TextField
            autoFocus
            size="small"
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={handleLinkUrlChange}
            onKeyDown={handleLinkKeyDown}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" variant="outlined" onClick={handleCloseLinkPopover}>
              Cancel
            </Button>
            <Button size="small" onClick={handleInsertLink}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {/* Image URL popover */}
      <Popover
        open={Boolean(imageUrlAnchor)}
        anchorEl={imageUrlAnchor}
        onClose={handleCloseImageUrlPopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Insert Image by URL</Typography>
          <TextField
            autoFocus
            size="small"
            label="Image URL"
            placeholder="https://example.com/image.png"
            value={imageUrl}
            onChange={handleImageUrlChange}
            onKeyDown={handleImageUrlKeyDown}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" variant="outlined" onClick={handleCloseImageUrlPopover}>
              Cancel
            </Button>
            <Button size="small" onClick={handleInsertImageUrl}>
              Insert
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {/* iFrame popover */}
      <Popover
        open={Boolean(iframeAnchor)}
        anchorEl={iframeAnchor}
        onClose={handleCloseIframePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Embed Content</Typography>
          <Typography variant="caption" color="text.secondary">
            Paste a YouTube, Vimeo, or any website URL. YouTube and Vimeo links are converted to
            embed URLs automatically.
          </Typography>
          <TextField
            autoFocus
            size="small"
            label="URL"
            placeholder="https://www.youtube.com/watch?v=…"
            value={iframeUrl}
            onChange={handleIframeUrlChange}
            onKeyDown={handleIframeKeyDown}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" variant="outlined" onClick={handleCloseIframePopover}>
              Cancel
            </Button>
            <Button size="small" onClick={handleInsertIframe}>
              Embed
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {/* Upload error snackbar-style */}
      {imageError && (
        <Typography variant="caption" color="error" sx={{ ml: 1, alignSelf: 'center' }}>
          {imageError}
        </Typography>
      )}
    </ToolbarWrapper>
  );
};

export default Toolbar;
