import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from './wrappers';

const LabelledButton = () => {
  const { t } = useTranslation();

  return <Button>{t('notFound.title')}</Button>;
};

describe('test wrappers smoke test', () => {
  it('renders an MUI component with English text and ltr direction by default', () => {
    renderWithProviders(<LabelledButton />);

    expect(screen.getByRole('button', { name: 'Page Not Found' })).toBeVisible();
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('renders Arabic text with rtl direction when language is ar', () => {
    renderWithProviders(<LabelledButton />, { language: 'ar' });

    expect(screen.getByRole('button', { name: 'الصفحة غير موجودة' })).toBeVisible();
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });
});
