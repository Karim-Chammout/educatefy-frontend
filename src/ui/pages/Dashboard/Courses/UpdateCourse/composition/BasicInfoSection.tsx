import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Control } from 'react-hook-form';
import { AutocompleteElement, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
// @ts-expect-error Cannot find module 'react-hook-form-mui/date-pickers' or its corresponding type declarations.
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import {
  CourseLevel,
  EditableCourseFragment,
  LanguageFragment,
  SubjectFragment,
} from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { isValidSlug } from '@/utils/isValidSlug';
import { isValidUrl } from '@/utils/isValidUrl';
import { RichTextEditor } from '@/ui/compositions';

type BasicInfoSectionType = {
  control: Control<any>;
  languages: LanguageFragment[];
  subjectsList: SubjectFragment[];
  watchedValues: {
    externalResourceLink: string | null;
    slug: string;
  };
  course: EditableCourseFragment;
  descriptionContent: string;
  setDescriptionContent: React.Dispatch<React.SetStateAction<string>>;
};

const BasicInfoSection = ({
  control,
  languages,
  subjectsList,
  watchedValues,
  course,
  descriptionContent,
  setDescriptionContent,
}: BasicInfoSectionType) => {
  const { t } = useTranslation();

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
          control={control}
          slotProps={{
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />

        <TextFieldElement
          name="slug"
          label={t('course.slug')}
          control={control}
          helperText={
            watchedValues.slug && !isValidSlug(watchedValues.slug)
              ? t('form.invalidSlug')
              : t('course.slugHelperText')
          }
          slotProps={{
            input: {
              error: !!watchedValues.slug && !isValidSlug(watchedValues.slug),
            },
            formHelperText: {
              error: !!watchedValues.slug && !isValidSlug(watchedValues.slug),
            },
            inputLabel: {
              error: !!watchedValues.slug && !isValidSlug(watchedValues.slug),
            },
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />

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
          options={subjectsList.map((s) => ({
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
              error: !!(
                watchedValues.externalResourceLink &&
                !isValidUrl(watchedValues.externalResourceLink)
              ),
            },
            formHelperText: {
              error: !!(
                watchedValues.externalResourceLink &&
                !isValidUrl(watchedValues.externalResourceLink)
              ),
            },
            inputLabel: {
              error: !!(
                watchedValues.externalResourceLink &&
                !isValidUrl(watchedValues.externalResourceLink)
              ),
            },
          }}
          control={control}
          helperText={
            watchedValues.externalResourceLink && !isValidUrl(watchedValues.externalResourceLink)
              ? t('form.invalidUrl')
              : t('course.externalResourceLinkHelperText')
          }
          fullWidth
        />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xxs: 'column', md: 'row' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flex: 1 }}>
              <DatePickerElement
                name="startDate"
                label={t('course.startDate')}
                control={control}
                sx={{ width: '100%' }}
                disablePast={!course.start_date}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DatePickerElement
                name="endDate"
                label={t('course.endDate')}
                control={control}
                sx={{ width: '100%' }}
                disablePast={!course.end_date}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box sx={{ minHeight: 200 }}>
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

export default BasicInfoSection;
