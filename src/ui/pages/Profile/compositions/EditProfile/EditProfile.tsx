import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import { useTranslation } from 'react-i18next';

import { AccountRole, UserProfileQuery, useUpdateProfileMutation } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { RichTextEditor } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { genderOptions } from '@/utils/genderOptions';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

const EditProfile = ({
  userInfo,
  countries,
  subjectOptions,
  setIsEditModalOpen,
}: {
  userInfo: UserProfileQuery['me'];
  countries: UserProfileQuery['countries'];
  subjectOptions: UserProfileQuery['subjects'];
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
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
    subjects: userInfo.subjects.map((s) => s.id) || [],
    bio: userInfo.bio || '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues,
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
        (!values.subjects.length || !values.bio || !hasDescription))
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('profile.fillRequiredFields'),
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
          teacherSpecialties: values.subjects.map((s: any) => s.id),
          teacherDescription: descriptionContent,
        },
      },
      onCompleted(data) {
        if (data.updateProfile?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('profile.updateSuccess'),
            newType: 'success',
          });

          setIsEditModalOpen(false);
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('profile.updateFailed'),
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
          <TextFieldElement
            name="firstName"
            label={t('profile.firstName')}
            control={control}
            required
          />
          <TextFieldElement
            name="lastName"
            label={t('profile.lastName')}
            control={control}
            required
          />
          <TextFieldElement
            name="nickname"
            label={t('profile.nickname')}
            control={control}
            required
          />
          <AutocompleteElement
            name="nationality"
            label={t('profile.nationality')}
            control={control}
            options={countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
            required
          />
          <AutocompleteElement
            name="country"
            label={t('profile.country')}
            control={control}
            options={countries.map((c) => ({
              id: c.id,
              label: c.denomination,
            }))}
            required
          />
          <AutocompleteElement
            name="gender"
            label={t('profile.gender')}
            control={control}
            options={genderOptions}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickerElement
              name="dateOfBirth"
              label={t('profile.dateOfBirth')}
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
                options={subjectOptions.map((s) => ({
                  id: s.id,
                  label: s.denomination,
                }))}
                multiple
                required
              />
              <TextareaAutosizeElement
                name="bio"
                label={t('profile.bio')}
                control={control}
                required
              />
              <RichTextEditor
                onChange={setDescriptionContent}
                initialValue={descriptionContent}
                placeholder={t('profile.descriptionPlaceholder')}
              />
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <Button variant="outlined" onClick={() => setIsEditModalOpen(false)} fullWidth>
            {t('profile.cancel')}
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
                (!subjects.length || !bio || !hasDescription))
            }
          >
            {t('profile.save')}
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default EditProfile;
