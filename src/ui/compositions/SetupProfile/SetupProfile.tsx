import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import {
  AutocompleteElement,
  FieldValues,
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
// @ts-expect-error Cannot find module 'react-hook-form-mui/date-pickers' or its corresponding type declarations.
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { useTranslation } from 'react-i18next';

import {
  AccountFragment,
  AccountRole,
  useSetupProfileQuery,
  useUpdateAccountInfoMutation,
} from '@/generated/graphql';
import { useLanguageSelection } from '@/hooks';
import { Button, Loader, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { genderOptions } from '@/utils/genderOptions';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

import ErrorPlaceholder from '../ErrorPlaceholder';
import LanguageSelector from '../LanguageSelector';
import RichTextEditor from '../RichTextEditor';

const SetupProfile = ({ userInfo }: { userInfo: AccountFragment }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguageSelection();
  const [descriptionContent, setDescriptionContent] = useState(userInfo.description || '');
  const { setToasterVisibility } = useContext(ToasterContext);
  const { loading, error, data } = useSetupProfileQuery();
  const [updateAccountInfo, { loading: updateAccountInfoLoading }] = useUpdateAccountInfoMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: userInfo.first_name || null,
      lastName: userInfo.last_name || null,
      nickname: userInfo.nickname || null,
      gender: genderOptions.find((option) => option.id === userInfo.gender) || null,
      nationality: userInfo.nationality || null,
      country: userInfo.country || null,
      dateOfBirth: userInfo.date_of_birth ? new Date(userInfo.date_of_birth) : null,
      subjects: userInfo.subjects.map((s) => s.id) || [],
      bio: userInfo.bio || null,
    },
  });

  const [firstName, lastName, nickname, gender, nationality, country, dateOfBirth, subjects, bio] =
    useWatch({
      name: [
        'firstName',
        'lastName',
        'nickname',
        'gender',
        'nationality',
        'country',
        'dateOfBirth',
        'subjects',
        'bio',
      ],
      control,
    });

  const onSubmit = async (values: FieldValues) => {
    const trimmedFirstName = values.firstName.trim();
    const trimmedLastName = values.lastName.trim();
    const trimmedNickname = values.nickname.trim();
    const formatedDateOfBirth = format(new Date(values.dateOfBirth), 'yyyy-MM-dd');

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedNickname ||
      !values.gender ||
      !values.nationality ||
      !values.country ||
      !values.dateOfBirth ||
      (userInfo.accountRole === AccountRole.Teacher &&
        (!values.subjects.length || !values.bio || !descriptionContent))
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('setupProfile.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    await updateAccountInfo({
      variables: {
        accountInfo: {
          selectedLanguage: currentLanguage,
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          nickname: trimmedNickname,
          nationalityId: values.nationality.id,
          countryId: values.country.id,
          gender: values.gender.id,
          dateOfBirth: formatedDateOfBirth,
          teacherSpecialties: values.subjects.map((s: any) => s.id),
          teacherBio: bio,
          teacherDescription: descriptionContent,
        },
      },
      onCompleted(res) {
        if (res.updateAccountInfo?.success) {
          window.location.href = '/explore';
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('setupProfile.updateFailed'),
            newType: 'error',
          });
        }
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  const hasDescription = removeHtmlTags(descriptionContent);

  return (
    <Container maxWidth="xs" sx={{ my: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('setupProfile.title')}
      </Typography>
      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <LanguageSelector />
          <TextFieldElement
            name="firstName"
            label={t('setupProfile.firstName')}
            control={control}
            required
          />
          <TextFieldElement
            name="lastName"
            label={t('setupProfile.lastName')}
            control={control}
            required
          />
          <TextFieldElement
            name="nickname"
            label={t('setupProfile.nickname')}
            control={control}
            required
          />
          <AutocompleteElement
            name="nationality"
            label={t('setupProfile.nationality')}
            control={control}
            required
            options={data.countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
          />
          <AutocompleteElement
            name="country"
            label={t('setupProfile.country')}
            control={control}
            required
            options={data.countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
          />
          <AutocompleteElement
            name="gender"
            label={t('setupProfile.gender')}
            control={control}
            required
            options={genderOptions}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickerElement
              name="dateOfBirth"
              label={t('setupProfile.dateOfBirth')}
              control={control}
              disableFuture
              required
            />
          </LocalizationProvider>
          {userInfo.accountRole === AccountRole.Teacher && (
            <>
              <AutocompleteElement
                name="subjects"
                label={t('setupProfile.specialty')}
                control={control}
                autocompleteProps={{
                  // TODO: Check if the library has been updated or double check a proper fix for this
                  // Seems like there is a bug in the library and the limitTags option doesn't work
                  // Workaround for disabling the option when the limit is reached
                  getOptionDisabled: () => subjects.length >= 3,
                }}
                options={data.subjects.map((s) => ({
                  id: s.id,
                  label: s.denomination,
                }))}
                multiple
                required
              />
              <TextareaAutosizeElement
                name="bio"
                label={t('setupProfile.bio')}
                control={control}
                helperText={t('setupProfile.bioHelperText')}
                rows={3}
                maxRows={3}
                required
              />
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder={t('setupProfile.descriptionPlaceholder')}
              />
            </>
          )}
        </div>

        <Button
          type="submit"
          disabled={
            !firstName ||
            !lastName ||
            !nickname ||
            !gender ||
            !nationality ||
            !country ||
            !dateOfBirth ||
            (userInfo.accountRole === AccountRole.Teacher &&
              (!hasDescription || !subjects.length || !bio)) ||
            updateAccountInfoLoading
          }
          fullWidth
          sx={{ mt: 4, mb: 8 }}
        >
          {t('setupProfile.submit')}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default SetupProfile;
