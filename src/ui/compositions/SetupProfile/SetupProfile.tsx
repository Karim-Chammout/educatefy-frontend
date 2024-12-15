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

import {
  AccountFragment,
  AccountRole,
  useCountriesQuery,
  useUpdateAccountInfoMutation,
} from '@/generated/graphql';
import { Button, Loader, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { genderOptions } from '@/utils/genderOptions';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

import RichTextEditor from '../RichTextEditor';

const SetupProfile = ({ userInfo }: { userInfo: AccountFragment }) => {
  const [descriptionContent, setDescriptionContent] = useState(userInfo.description || '');
  const { setToasterVisibility } = useContext(ToasterContext);
  const { loading, error, data } = useCountriesQuery();
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
      specialty: userInfo.specialty || null,
      bio: userInfo.bio || null,
    },
  });

  const [firstName, lastName, nickname, gender, nationality, country, dateOfBirth, specialty, bio] =
    useWatch({
      name: [
        'firstName',
        'lastName',
        'nickname',
        'gender',
        'nationality',
        'country',
        'dateOfBirth',
        'specialty',
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
      (userInfo.accountRole === AccountRole.Teacher && (!specialty || !bio))
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: 'Make sure to fill out the required form values correctly!',
        newType: 'error',
      });

      return;
    }

    await updateAccountInfo({
      variables: {
        accountInfo: {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          nickname: trimmedNickname,
          nationalityId: values.nationality.id,
          countryId: values.country.id,
          gender: values.gender.id,
          dateOfBirth: formatedDateOfBirth,
          teacherSpecialty: specialty,
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
            newText: 'Failed to update profile information. Please try again later!',
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
    // TODO: Create an error page
    return <p>Something went wrong!</p>;
  }

  const hasDescription = removeHtmlTags(descriptionContent);

  return (
    <Container maxWidth="xs" sx={{ my: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Set up your profile
      </Typography>
      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TextFieldElement name="firstName" label="First name" control={control} required />
          <TextFieldElement name="lastName" label="Last name" control={control} required />
          <TextFieldElement name="nickname" label="Nickname" control={control} required />
          <AutocompleteElement
            name="nationality"
            label="Nationality"
            control={control}
            required
            options={data.countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
          />
          <AutocompleteElement
            name="country"
            label="Current country"
            control={control}
            required
            options={data.countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
          />
          <AutocompleteElement
            name="gender"
            label="Gender"
            control={control}
            required
            options={genderOptions}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickerElement
              name="dateOfBirth"
              label="Date of birth"
              control={control}
              disableFuture
              required
            />
          </LocalizationProvider>
          {userInfo.accountRole === AccountRole.Teacher && (
            <>
              <TextFieldElement name="specialty" label="Specialty" control={control} required />
              <TextareaAutosizeElement
                name="bio"
                label="Bio"
                control={control}
                helperText="Write a short bio about yourself"
                rows={3}
                maxRows={3}
                required
              />
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder="Write a description about yourself here..."
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
            (userInfo.accountRole === AccountRole.Teacher && (!hasDescription || !bio)) ||
            updateAccountInfoLoading
          }
          fullWidth
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
      </FormContainer>
    </Container>
  );
};

export default SetupProfile;
