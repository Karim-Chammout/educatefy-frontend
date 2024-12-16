import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
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

import { AccountRole, UserProfileQuery, useUpdateProfileMutation } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { genderOptions } from '@/utils/genderOptions';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

const EditProfile = ({
  userInfo,
  countries,
  setIsEditModalOpen,
}: {
  userInfo: UserProfileQuery['me'];
  countries: UserProfileQuery['countries'];
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [descriptionContent, setDescriptionContent] = useState(userInfo.description || '');

  const hasDescription = removeHtmlTags(descriptionContent);

  const { setToasterVisibility } = useContext(ToasterContext);

  const defaultValues = {
    firstName: userInfo.first_name || '',
    lastName: userInfo.last_name || '',
    nickname: userInfo.nickname || '',
    nationality: userInfo.nationality?.id || null,
    country: userInfo.country?.id || null,
    gender: userInfo.gender || null,
    dateOfBirth: new Date(userInfo.date_of_birth) || null,
    specialty: userInfo.specialty || '',
    bio: userInfo.bio || '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues,
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

  const [updateProfile] = useUpdateProfileMutation();

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
        (!values.specialty || !values.bio || !hasDescription))
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: 'Make sure to fill out the required form values correctly!',
        newType: 'error',
      });

      return;
    }

    await updateProfile({
      variables: {
        profileDetails: {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          nickname: trimmedNickname,
          nationalityId: values.nationality.id,
          countryId: values.country.id,
          gender: values.gender.id,
          dateOfBirth: formatedDateOfBirth,
          teacherBio: values.bio,
          teacherSpecialty: values.specialty,
          teacherDescription: descriptionContent,
        },
      },
      onCompleted(data) {
        if (data.updateProfile?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: 'Profile updated successfully!',
            newType: 'success',
          });

          setIsEditModalOpen(false);
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: 'Failed to update profile details. Please try again later!',
            newType: 'error',
          });
        }
      },
    });
  };

  return (
    <div style={{ width: '100%' }}>
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
            options={countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
            required
          />
          <AutocompleteElement
            name="country"
            label="Current country"
            control={control}
            options={countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
            required
          />
          <AutocompleteElement
            name="gender"
            label="Gender"
            control={control}
            options={genderOptions}
            required
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
              <TextareaAutosizeElement name="bio" label="Bio" control={control} required />
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder="Write a description about yourself here..."
              />
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <Button variant="outlined" onClick={() => setIsEditModalOpen(false)} fullWidth>
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            disabled={
              !firstName ||
              !lastName ||
              !nickname ||
              !gender ||
              !nationality ||
              !country ||
              !dateOfBirth ||
              (userInfo.accountRole === AccountRole.Teacher &&
                (!specialty || !bio || !hasDescription))
            }
          >
            Save
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default EditProfile;
