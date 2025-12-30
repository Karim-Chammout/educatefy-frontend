import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { AutocompleteElement, Control, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { CourseLevel, SubjectFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { isValidSlug } from '@/utils/isValidSlug';

import { FormHandlers, FormState } from './types';

type BasicInfoSectionType = {
  control: Control<any>;
  formState: FormState;
  formHandlers: FormHandlers;
  subjectsList: SubjectFragment[];
};

const BasicInfoSection = ({
  control,
  formState,
  formHandlers,
  subjectsList,
}: BasicInfoSectionType) => {
  const { t } = useTranslation();
  const { denomination, slug, descriptionContent } = formState;
  const { generateSlug, setDescriptionContent } = formHandlers;

  const sortedSubjectsList = [...subjectsList].sort((a, b) =>
    a.denomination.localeCompare(b.denomination),
  );

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
          helperText={t('program.subtitleHelperText')}
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
            label={t('program.slug')}
            control={control}
            helperText={
              slug && !isValidSlug(slug) ? t('form.invalidSlug') : t('program.slugHelperText')
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
            {t('program.generateSlug')}
          </Button>
        </Box>
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
          label={t('program.subjects')}
          textFieldProps={{
            helperText: t('program.subjectsHelperText'),
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

        <Box>
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
