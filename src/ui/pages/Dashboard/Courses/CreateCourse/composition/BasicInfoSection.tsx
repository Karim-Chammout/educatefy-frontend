import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AutocompleteElement, Control, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
// @ts-expect-error Cannot find module 'react-hook-form-mui/date-pickers' or its corresponding type declarations.
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';

import { CourseLevel, LanguageFragment, SubjectFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { isValidSlug } from '@/utils/isValidSlug';
import { isValidUrl } from '@/utils/isValidUrl';

import { FormHandlers, FormState } from './types';

type BasicInfoSectionType = {
  control: Control<any>;
  formState: FormState;
  formHandlers: FormHandlers;
  languages: LanguageFragment[];
  subjectsList: SubjectFragment[];
};

export const BasicInfoSection = ({
  control,
  formState,
  formHandlers,
  languages,
  subjectsList,
}: BasicInfoSectionType) => {
  const { t } = useTranslation();
  const { denomination, slug, externalResourceLink, descriptionContent } = formState;
  const { generateSlug, setDescriptionContent } = formHandlers;

  const sortedSubjectsList = [...subjectsList].sort((a, b) =>
    a.denomination.localeCompare(b.denomination),
  );

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('course.basicInfo')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('course.basicInfoSubtitle')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextFieldElement
          name="denomination"
          label={t('course.name')}
          control={control}
          slotProps={{
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />
        <TextFieldElement
          name="subtitle"
          label={t('course.subtitle')}
          helperText={t('course.subtitleHelperText')}
          control={control}
          slotProps={{
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <TextFieldElement
            name="slug"
            label={t('course.slug')}
            control={control}
            helperText={
              slug && !isValidSlug(slug) ? t('form.invalidSlug') : t('course.slugHelperText')
            }
            slotProps={{
              input: {
                error: !!slug && !isValidSlug(slug),
              },
              formHelperText: {
                error: !!slug && !isValidSlug(slug),
              },
              inputLabel: {
                error: !!slug && !isValidSlug(slug),
              },
              htmlInput: { maxLength: 255 },
            }}
            required
            fullWidth
          />
          <Button disabled={!denomination} variant="outlined" onClick={generateSlug}>
            {t('course.generateSlug')}
          </Button>
        </Box>
        <AutocompleteElement
          name="language"
          label={t('course.language')}
          textFieldProps={{
            helperText: t('course.languageHelperText'),
          }}
          control={control}
          options={languages.map((lang) => ({
            id: lang.code,
            label: lang.denomination,
          }))}
          autocompleteProps={{
            groupBy: (option) => option.label[0].toUpperCase(),
          }}
          required
        />
        <AutocompleteElement
          name="level"
          label={t('course.level')}
          control={control}
          required
          options={Object.values(CourseLevel).map((courseLevel) => ({
            id: courseLevel,
            label: t(`course.courseLevel.${courseLevel}`),
          }))}
          autocompleteProps={{
            fullWidth: true,
          }}
        />
        <AutocompleteElement
          name="subjects"
          label={t('course.subjects')}
          textFieldProps={{
            helperText: t('course.subjectsHelperText'),
          }}
          control={control}
          options={sortedSubjectsList.map((s) => ({
            id: s.id,
            label: s.denomination,
          }))}
          autocompleteProps={{
            groupBy: (option) => option.label[0].toUpperCase(),
            blurOnSelect: true,
          }}
          multiple
          required
        />
        <TextFieldElement
          name="externalResourceLink"
          label={t('course.externalResourceLink')}
          slotProps={{
            input: {
              error: !!externalResourceLink && !isValidUrl(externalResourceLink),
            },
            formHelperText: {
              error: !!externalResourceLink && !isValidUrl(externalResourceLink),
            },
            inputLabel: {
              error: !!externalResourceLink && !isValidUrl(externalResourceLink),
            },
            htmlInput: { maxLength: 255 },
          }}
          control={control}
          helperText={
            externalResourceLink && !isValidUrl(externalResourceLink)
              ? t('form.invalidUrl')
              : t('course.externalResourceLinkHelperText')
          }
          fullWidth
        />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flex: 1 }}>
              <DatePickerElement
                name="startDate"
                label={t('course.startDate')}
                control={control}
                sx={{ width: '100%' }}
                disablePast
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DatePickerElement
                name="endDate"
                label={t('course.endDate')}
                control={control}
                sx={{ width: '100%' }}
                disablePast
              />
            </Box>
          </LocalizationProvider>
        </Box>

        <Box>
          <RichTextEditor
            onChange={setDescriptionContent}
            initialValue={descriptionContent}
            placeholder={t('course.descriptionPlaceholder')}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t('course.description')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
