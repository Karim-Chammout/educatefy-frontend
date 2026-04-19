import CodeIcon from '@mui/icons-material/Code';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import RedoIcon from '@mui/icons-material/Redo';
import TableChartIcon from '@mui/icons-material/TableChart';
import TitleIcon from '@mui/icons-material/Title';
import TuneIcon from '@mui/icons-material/Tune';
import UndoIcon from '@mui/icons-material/Undo';
import WebIcon from '@mui/icons-material/Web';
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
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
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { FileResponseType } from '@/types/types';
import { Button } from '@/ui/components';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ToolbarDivider, ToolbarWrapper } from './RichTextEditor.style';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];
const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

// Preset swatches for color + highlight
const COLOR_SWATCHES = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#b7b7b7',
  '#ffffff',
  '#ff0000',
  '#ff9900',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#0000ff',
  '#9900ff',
  '#ff00ff',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#4285f4',
];

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

const ToolbarButton = ({ label, onClick, active, disabled, children }: ToolbarButtonProps) => (
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

// ── Small swatch grid used inside color popovers ──────────────────────────────
const SwatchGrid = ({
  onSelect,
  onClear,
  clearLabel,
}: {
  onSelect: (color: string) => void;
  onClear: () => void;
  clearLabel: string;
}) => (
  <Stack spacing={1}>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5 }}>
      {COLOR_SWATCHES.map((color) => (
        <Tooltip key={color} title={color} placement="top" arrow>
          <Box
            onClick={() => onSelect(color)}
            sx={{
              width: 22,
              height: 22,
              borderRadius: 0.5,
              backgroundColor: color,
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              '&:hover': { transform: 'scale(1.15)', transition: 'transform 0.1s' },
            }}
          />
        </Tooltip>
      ))}
    </Box>
    <Button size="small" variant="text" onClick={onClear} sx={{ alignSelf: 'flex-start', px: 0 }}>
      {clearLabel}
    </Button>
  </Stack>
);

const Toolbar = ({ editor, uploadEndpoint, disabled }: ToolbarProps) => {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textColorInputRef = useRef<HTMLInputElement>(null);
  const highlightColorInputRef = useRef<HTMLInputElement>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // ── Popover anchors ───────────────────────────────────────────────
  const [headingAnchor, setHeadingAnchor] = useState<HTMLElement | null>(null);
  const [linkAnchor, setLinkAnchor] = useState<HTMLElement | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [iframeAnchor, setIframeAnchor] = useState<HTMLElement | null>(null);
  const [iframeUrl, setIframeUrl] = useState('');
  const [imageUrlAnchor, setImageUrlAnchor] = useState<HTMLElement | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [tableAnchor, setTableAnchor] = useState<HTMLElement | null>(null);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableActionsAnchor, setTableActionsAnchor] = useState<HTMLElement | null>(null);
  const [textColorAnchor, setTextColorAnchor] = useState<HTMLElement | null>(null);
  const [highlightAnchor, setHighlightAnchor] = useState<HTMLElement | null>(null);

  // ── Active color indicators ───────────────────────────────────────
  const activeTextColor = (editor.getAttributes('textStyle').color as string | undefined) ?? null;
  const activeHighlight = (editor.getAttributes('highlight').color as string | undefined) ?? null;

  // ── Font size ─────────────────────────────────────────────────────
  const activeFontSize = (editor.getAttributes('textStyle').fontSize as string | undefined) ?? '';

  const handleFontSizeChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    if (val === '') {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(val).run();
    }
  };

  // ── Headings ──────────────────────────────────────────────────────
  const activeHeading = HEADING_LEVELS.find((l) => editor.isActive('heading', { level: l }));
  const headingLabel = activeHeading ? `H${activeHeading}` : 'H';

  const handleHeadingSelect = (level: (typeof HEADING_LEVELS)[number]) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setHeadingAnchor(null);
  };

  // ── Image upload ──────────────────────────────────────────────────
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    if (!file) return;
    setImageError(null);
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setImageError(t('toolbar.image.errorType'));

      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setImageError(t('toolbar.image.errorSize'));

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
        setImageError(response.message ?? t('toolbar.image.errorUpload'));
      }
    } catch {
      setImageError(t('toolbar.image.errorUpload'));
    } finally {
      setImageUploading(false);
    }
  };

  // ── Link ──────────────────────────────────────────────────────────
  const handleOpenLink = (e: MouseEvent<HTMLButtonElement>) => {
    setLinkUrl(editor.getAttributes('link').href ?? '');
    setLinkAnchor(e.currentTarget);
  };
  const handleInsertLink = useCallback(() => {
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl.trim(), target: '_blank' }).run();
    }
    setLinkUrl('');
    setLinkAnchor(null);
  }, [editor, linkUrl]);

  // ── Image URL ─────────────────────────────────────────────────────
  const handleInsertImageUrl = useCallback(() => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    }
    setImageUrl('');
    setImageUrlAnchor(null);
  }, [editor, imageUrl]);

  // ── iFrame ────────────────────────────────────────────────────────
  const handleInsertIframe = useCallback(() => {
    if (iframeUrl.trim()) {
      editor.chain().focus().setIframe({ src: iframeUrl.trim() }).run();
    }
    setIframeUrl('');
    setIframeAnchor(null);
  }, [editor, iframeUrl]);

  // ── Table ─────────────────────────────────────────────────────────
  const handleInsertTable = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
      .run();
    setTableAnchor(null);
  }, [editor, tableRows, tableCols]);

  return (
    <ToolbarWrapper>
      {/* ── History ── */}
      <ToolbarButton
        label={t('toolbar.undo')}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={disabled || !editor.can().undo()}
      >
        <UndoIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.redo')}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={disabled || !editor.can().redo()}
      >
        <RedoIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* ── Headings (grouped dropdown) ── */}
      <Tooltip title={t('toolbar.heading')} placement="top" arrow>
        <span>
          <IconButton
            size="small"
            disabled={disabled}
            onClick={(e) => setHeadingAnchor(e.currentTarget)}
            sx={{
              borderRadius: 1,
              width: 36,
              height: 28,
              backgroundColor: activeHeading ? 'primary.main' : 'transparent',
              color: activeHeading ? 'primary.contrastText' : 'text.primary',
              '&:hover': { backgroundColor: activeHeading ? 'primary.dark' : 'action.hover' },
            }}
          >
            <Typography variant="caption" fontWeight={700} lineHeight={1}>
              {headingLabel}
            </Typography>
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        open={Boolean(headingAnchor)}
        anchorEl={headingAnchor}
        onClose={() => setHeadingAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 1 } } }}
      >
        <Stack direction="row" spacing={0.5}>
          {HEADING_LEVELS.map((level) => (
            <Tooltip
              key={level}
              title={t('toolbar.heading.level', { level })}
              placement="top"
              arrow
            >
              <IconButton
                size="small"
                onClick={() => handleHeadingSelect(level)}
                sx={{
                  borderRadius: 1,
                  width: 32,
                  height: 28,
                  backgroundColor: editor.isActive('heading', { level })
                    ? 'primary.main'
                    : 'transparent',
                  color: editor.isActive('heading', { level })
                    ? 'primary.contrastText'
                    : 'text.primary',
                  '&:hover': {
                    backgroundColor: editor.isActive('heading', { level })
                      ? 'primary.dark'
                      : 'action.hover',
                  },
                }}
              >
                <Typography variant="caption" fontWeight={700} lineHeight={1}>
                  H{level}
                </Typography>
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Popover>

      <ToolbarDivider />

      {/* ── Inline marks ── */}
      <ToolbarButton
        label={t('toolbar.bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        disabled={disabled}
      >
        <FormatBoldIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        disabled={disabled}
      >
        <FormatItalicIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.strikethrough')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        disabled={disabled}
      >
        <FormatStrikethroughIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.inlineCode')}
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        disabled={disabled}
      >
        <CodeIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* ── Font size ── */}
      <Tooltip title={t('toolbar.fontSize')} placement="top" arrow>
        <Select
          size="small"
          value={activeFontSize}
          onChange={handleFontSizeChange}
          disabled={disabled}
          displayEmpty
          renderValue={(val) => (
            <Typography variant="caption" fontWeight={500}>
              {val || t('toolbar.fontSize.label')}
            </Typography>
          )}
          sx={{
            height: 28,
            fontSize: '0.75rem',
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiSelect-select': { py: 0, px: 1 },
            minWidth: 58,
            borderRadius: 1,
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <MenuItem value="">
            <Typography variant="caption">{t('toolbar.fontSize.default')}</Typography>
          </MenuItem>
          {FONT_SIZES.map((size) => (
            <MenuItem key={size} value={size}>
              <Typography variant="caption">{size}</Typography>
            </MenuItem>
          ))}
        </Select>
      </Tooltip>

      {/* ── Text color ── */}
      <Tooltip title={t('toolbar.textColor')} placement="top" arrow>
        <span>
          <IconButton
            size="small"
            disabled={disabled}
            onClick={(e) => setTextColorAnchor(e.currentTarget)}
            sx={{ borderRadius: 1, width: 28, height: 28 }}
          >
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FormatColorTextIcon fontSize="small" />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -3,
                  left: 1,
                  right: 1,
                  height: 3,
                  borderRadius: 0.5,
                  backgroundColor: activeTextColor ?? 'text.primary',
                }}
              />
            </Box>
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        open={Boolean(textColorAnchor)}
        anchorEl={textColorAnchor}
        onClose={() => setTextColorAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 1.5 } } }}
      >
        <Stack spacing={1}>
          <Typography variant="caption" fontWeight={600}>
            {t('toolbar.textColor')}
          </Typography>
          <SwatchGrid
            onSelect={(color) => {
              editor.chain().focus().setColor(color).run();
              setTextColorAnchor(null);
            }}
            onClear={() => {
              editor.chain().focus().unsetColor().run();
              setTextColorAnchor(null);
            }}
            clearLabel={t('toolbar.textColor.remove')}
          />
          {/* Native color picker for custom colors */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              {t('toolbar.textColor.custom')}
            </Typography>
            <input
              ref={textColorInputRef}
              type="color"
              defaultValue={activeTextColor ?? '#000000'}
              style={{ width: 28, height: 28, border: 'none', cursor: 'pointer', padding: 0 }}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            />
          </Stack>
        </Stack>
      </Popover>

      {/* ── Highlight ── */}
      <Tooltip title={t('toolbar.highlight')} placement="top" arrow>
        <span>
          <IconButton
            size="small"
            disabled={disabled}
            onClick={(e) => setHighlightAnchor(e.currentTarget)}
            sx={{
              borderRadius: 1,
              width: 28,
              height: 28,
              backgroundColor: activeHighlight ? `${activeHighlight}55` : 'transparent',
            }}
          >
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FormatColorFillIcon fontSize="small" />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -3,
                  left: 1,
                  right: 1,
                  height: 3,
                  borderRadius: 0.5,
                  backgroundColor: activeHighlight ?? 'warning.main',
                }}
              />
            </Box>
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        open={Boolean(highlightAnchor)}
        anchorEl={highlightAnchor}
        onClose={() => setHighlightAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 1.5 } } }}
      >
        <Stack spacing={1}>
          <Typography variant="caption" fontWeight={600}>
            {t('toolbar.highlight')}
          </Typography>
          <SwatchGrid
            onSelect={(color) => {
              editor.chain().focus().toggleHighlight({ color }).run();
              setHighlightAnchor(null);
            }}
            onClear={() => {
              editor.chain().focus().unsetHighlight().run();
              setHighlightAnchor(null);
            }}
            clearLabel={t('toolbar.highlight.remove')}
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              {t('toolbar.highlight.custom')}
            </Typography>
            <input
              ref={highlightColorInputRef}
              type="color"
              defaultValue={activeHighlight ?? '#ffff00'}
              style={{ width: 28, height: 28, border: 'none', cursor: 'pointer', padding: 0 }}
              onChange={(e) =>
                editor.chain().focus().toggleHighlight({ color: e.target.value }).run()
              }
            />
          </Stack>
        </Stack>
      </Popover>

      <ToolbarDivider />

      {/* ── Alignment ── */}
      <ToolbarButton
        label={t('toolbar.alignLeft')}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        disabled={disabled}
      >
        <FormatAlignLeftIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.alignCenter')}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        disabled={disabled}
      >
        <FormatAlignCenterIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.alignRight')}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        disabled={disabled}
      >
        <FormatAlignRightIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* ── Lists & blocks ── */}
      <ToolbarButton
        label={t('toolbar.bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        disabled={disabled}
      >
        <FormatListBulletedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.numberedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        disabled={disabled}
      >
        <FormatListNumberedIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        disabled={disabled}
      >
        <FormatQuoteIcon fontSize="small" />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.divider')}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={disabled}
      >
        <HorizontalRuleIcon fontSize="small" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* ── Table ── */}
      <ToolbarButton
        label={t('toolbar.table.insert')}
        onClick={(e) => setTableAnchor(e.currentTarget)}
        disabled={disabled}
      >
        <TableChartIcon fontSize="small" />
      </ToolbarButton>
      {editor.isActive('table') && (
        <ToolbarButton
          label={t('toolbar.table.actions')}
          onClick={(e) => setTableActionsAnchor(e.currentTarget)}
          disabled={disabled}
        >
          <TuneIcon fontSize="small" />
        </ToolbarButton>
      )}
      <Popover
        open={Boolean(tableAnchor)}
        anchorEl={tableAnchor}
        onClose={() => setTableAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 220 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">{t('toolbar.table.insert')}</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label={t('toolbar.table.rows')}
              type="number"
              value={tableRows}
              onChange={(e) => setTableRows(Math.max(1, Number(e.target.value)))}
              slotProps={{
                htmlInput: { min: 1, max: 20 },
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label={t('toolbar.table.cols')}
              type="number"
              value={tableCols}
              onChange={(e) => setTableCols(Math.max(1, Number(e.target.value)))}
              slotProps={{
                htmlInput: { min: 1, max: 20 },
              }}
              sx={{ flex: 1 }}
            />
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={() => setTableAnchor(null)}>
              {t('common.cancel')}
            </Button>
            <Button size="small" onClick={handleInsertTable}>
              {t('toolbar.table.insert')}
            </Button>
          </Stack>
        </Stack>
      </Popover>
      <Popover
        open={Boolean(tableActionsAnchor)}
        anchorEl={tableActionsAnchor}
        onClose={() => setTableActionsAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 1, minWidth: 190 } } }}
      >
        <Stack spacing={0.25}>
          {[
            {
              label: t('toolbar.table.addRowBefore'),
              cmd: () => editor.chain().focus().addRowBefore().run(),
            },
            {
              label: t('toolbar.table.addRowAfter'),
              cmd: () => editor.chain().focus().addRowAfter().run(),
            },
            {
              label: t('toolbar.table.deleteRow'),
              cmd: () => editor.chain().focus().deleteRow().run(),
            },
            {
              label: t('toolbar.table.addColumnBefore'),
              cmd: () => editor.chain().focus().addColumnBefore().run(),
            },
            {
              label: t('toolbar.table.addColumnAfter'),
              cmd: () => editor.chain().focus().addColumnAfter().run(),
            },
            {
              label: t('toolbar.table.deleteColumn'),
              cmd: () => editor.chain().focus().deleteColumn().run(),
            },
            {
              label: t('toolbar.table.mergeCells'),
              cmd: () => editor.chain().focus().mergeCells().run(),
            },
            {
              label: t('toolbar.table.splitCell'),
              cmd: () => editor.chain().focus().splitCell().run(),
            },
            {
              label: t('toolbar.table.delete'),
              cmd: () => editor.chain().focus().deleteTable().run(),
            },
          ].map(({ label, cmd }) => (
            <Button
              key={label}
              size="small"
              onClick={() => {
                cmd();
                setTableActionsAnchor(null);
              }}
              sx={{
                justifyContent: 'flex-start',
                color: label === t('toolbar.table.delete') ? 'error.main' : 'text.primary',
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Popover>

      <ToolbarDivider />

      {/* ── Link ── */}
      <ToolbarButton
        label={t('toolbar.link.insert')}
        onClick={handleOpenLink}
        active={editor.isActive('link')}
        disabled={disabled}
      >
        <InsertLinkIcon fontSize="small" />
      </ToolbarButton>

      {/* ── Image upload ── */}
      <Tooltip
        title={imageUploading ? t('toolbar.image.uploading') : t('toolbar.image.upload')}
        placement="top"
        arrow
      >
        <span>
          <IconButton
            size="small"
            disabled={disabled || imageUploading}
            onClick={() => fileInputRef.current?.click()}
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

      {/* ── Image by URL ── */}
      <ToolbarButton
        label={t('toolbar.image.byUrl')}
        onClick={(e) => setImageUrlAnchor(e.currentTarget)}
        disabled={disabled}
      >
        <TitleIcon fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
      </ToolbarButton>

      {/* ── iFrame embed ── */}
      <ToolbarButton
        label={t('toolbar.embed.button')}
        onClick={(e) => setIframeAnchor(e.currentTarget)}
        disabled={disabled}
      >
        <WebIcon fontSize="small" />
      </ToolbarButton>

      {/* ── Popovers: Link / Image URL / iFrame ── */}
      <Popover
        open={Boolean(linkAnchor)}
        anchorEl={linkAnchor}
        onClose={() => setLinkAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">{t('toolbar.link.insert')}</Typography>
          <TextField
            autoFocus
            size="small"
            label={t('toolbar.link.url')}
            placeholder={t('toolbar.link.urlPlaceholder')}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') handleInsertLink();
            }}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={() => setLinkAnchor(null)}>
              {t('common.cancel')}
            </Button>
            <Button size="small" onClick={handleInsertLink}>
              {t('toolbar.link.apply')}
            </Button>
          </Stack>
        </Stack>
      </Popover>

      <Popover
        open={Boolean(imageUrlAnchor)}
        anchorEl={imageUrlAnchor}
        onClose={() => setImageUrlAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">{t('toolbar.image.byUrl')}</Typography>
          <TextField
            autoFocus
            size="small"
            label={t('toolbar.image.urlLabel')}
            placeholder={t('toolbar.image.urlPlaceholder')}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') handleInsertImageUrl();
            }}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={() => setImageUrlAnchor(null)}>
              {t('common.cancel')}
            </Button>
            <Button size="small" onClick={handleInsertImageUrl}>
              {t('toolbar.image.insert')}
            </Button>
          </Stack>
        </Stack>
      </Popover>

      <Popover
        open={Boolean(iframeAnchor)}
        anchorEl={iframeAnchor}
        onClose={() => setIframeAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, width: 320 } } }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">{t('toolbar.embed.title')}</Typography>
          <Typography variant="caption" color="text.secondary">
            {t('toolbar.embed.description')}
          </Typography>
          <TextField
            autoFocus
            size="small"
            label={t('toolbar.link.url')}
            placeholder={t('toolbar.embed.urlPlaceholder')}
            value={iframeUrl}
            onChange={(e) => setIframeUrl(e.target.value)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') handleInsertIframe();
            }}
            fullWidth
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={() => setIframeAnchor(null)}>
              {t('common.cancel')}
            </Button>
            <Button size="small" onClick={handleInsertIframe}>
              {t('toolbar.embed.action')}
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {imageError && (
        <Typography variant="caption" color="error" sx={{ ml: 1, alignSelf: 'center' }}>
          {imageError}
        </Typography>
      )}
    </ToolbarWrapper>
  );
};

export default Toolbar;
