import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Control } from 'react-hook-form';
import { AutocompleteElement, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { ProgramLevel, SubjectFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { isValidSlug } from '@/utils/isValidSlug';

type BasicInfoSectionType = {
  control: Control<any>;
  subjectsList: SubjectFragment[];
  watchedValues: {
    slug: string;
  };
  descriptionContent: string;
  setDescriptionContent: React.Dispatch<React.SetStateAction<string>>;
};

const BasicInfoSection = ({
  control,
  subjectsList,
  watchedValues,
  descriptionContent,
  setDescriptionContent,
}: BasicInfoSectionType) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('program.basicInfo')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('program.basicInfoSubtitle')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextFieldElement
          name="denomination"
          label={t('program.name')}
          control={control}
          slotProps={{
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />

        <TextFieldElement
          name="subtitle"
          label={t('program.subtitle')}
          control={control}
          slotProps={{
            htmlInput: { maxLength: 255 },
          }}
          required
          fullWidth
        />

        <TextFieldElement
          name="slug"
          label={t('program.slug')}
          control={control}
          helperText={
            watchedValues.slug && !isValidSlug(watchedValues.slug)
              ? t('form.invalidSlug')
              : t('program.slugHelperText')
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
          name="level"
          label={t('course.level')}
          control={control}
          required
          options={Object.values(ProgramLevel).map((programLevel) => ({
            id: programLevel,
            label: t(`course.courseLevel.${programLevel}`),
          }))}
          autocompleteProps={{
            fullWidth: true,
          }}
        />

        <AutocompleteElement
          name="subjects"
          label={t('program.subjects')}
          textFieldProps={{
            helperText: t('program.subjectsHelperText'),
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

        <Box sx={{ minHeight: 200 }}>
          <RichTextEditor
            onChange={setDescriptionContent}
            initialValue={descriptionContent}
            placeholder={t('program.descriptionPlaceholder')}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t('program.description')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BasicInfoSection;
