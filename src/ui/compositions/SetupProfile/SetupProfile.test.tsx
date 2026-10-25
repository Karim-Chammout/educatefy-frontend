import { useContext } from 'react';
import { format } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import {
  AccountRole,
  Gender,
  SetupProfileDocument,
  UpdateAccountInfoDocument,
} from '@/generated/graphql';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/wrappers';
import { ToasterContext, ToasterProvider } from '@/ui/context';
import SetupProfile from '@/ui/compositions/SetupProfile/SetupProfile';

import type { AccountFragment } from '@/generated/graphql';

const egypt = { __typename: 'Country' as const, id: '1', denomination: 'Egypt' };
const france = { __typename: 'Country' as const, id: '2', denomination: 'France' };

const studentInfo: AccountFragment = {
  __typename: 'Account',
  id: '1',
  nickname: 'karim',
  first_name: 'Karim',
  last_name: 'Ali',
  gender: Gender.Male,
  date_of_birth: '2000-01-01',
  avatar_url: null,
  preferredLanguage: 'en',
  accountRole: AccountRole.Student,
  bio: null,
  description: null,
  country: egypt,
  nationality: egypt,
  subjects: [],
};

const teacherInfo: AccountFragment = {
  ...studentInfo,
  id: '2',
  accountRole: AccountRole.Teacher,
};

const setupQueryMock: MockLink.MockedResponse = {
  request: { query: SetupProfileDocument },
  result: {
    data: {
      countries: [egypt, france],
      subjects: [{ __typename: 'Subject', id: '1', denomination: 'Math' }],
    },
  },
};

/** Everything the component submits for the untouched student form. */
const defaultAccountInfo = {
  selectedLanguage: 'en',
  firstName: 'Karim',
  lastName: 'Ali',
  nickname: 'karim',
  nationalityId: '1',
  countryId: '1',
  gender: Gender.Male,
  dateOfBirth: format(new Date(studentInfo.date_of_birth), 'yyyy-MM-dd'),
  teacherSpecialties: [],
  teacherBio: null,
  teacherDescription: '',
};

const updateMock = (
  accountInfo: Partial<typeof defaultAccountInfo>,
  response: { success: boolean; errors?: Array<{ message: string }> },
): MockLink.MockedResponse => ({
  request: {
    query: UpdateAccountInfoDocument,
    variables: { accountInfo: { ...defaultAccountInfo, ...accountInfo } },
  },
  result: {
    data: {
      updateAccountInfo: {
        __typename: 'MutationResult',
        success: response.success,
        errors: (response.errors ?? []).map((error) => ({ __typename: 'Error', ...error })),
      },
    },
  },
});

const successMock = (accountInfo: Partial<typeof defaultAccountInfo> = {}) =>
  updateMock(accountInfo, { success: true });

const ToasterProbe = () => {
  const { isVisible, text } = useContext(ToasterContext);

  return isVisible ? <p role="status">{text}</p> : null;
};

const renderSetupProfile = (
  apolloMocks: MockLink.MockedResponse[] = [],
  userInfo: AccountFragment = studentInfo,
) =>
  renderWithProviders(
    <ToasterProvider>
      <SetupProfile userInfo={userInfo} />
      <ToasterProbe />
    </ToasterProvider>,
    { apolloMocks },
  );

const submitForm = async () => {
  expect(await screen.findByRole('heading', { name: 'Set up your profile' })).toBeVisible();

  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
};

describe('SetupProfile', () => {
  it('renders the skeleton while loading', () => {
    renderSetupProfile([{ ...setupQueryMock, delay: 60_000 }]);

    expect(document.querySelector('.MuiSkeleton-root')).not.toBe(null);
    expect(screen.queryByRole('heading', { name: 'Set up your profile' })).toBe(null);
  });

  it('renders the error placeholder on query failure', async () => {
    renderSetupProfile([
      { request: { query: SetupProfileDocument }, error: new Error('Network error') },
    ]);

    expect(await screen.findByText('An Error Occurred')).toBeVisible();
  });

  it('renders the form with an enabled submit for complete info', async () => {
    renderSetupProfile([setupQueryMock]);

    expect(await screen.findByRole('heading', { name: 'Set up your profile' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('renders the teacher-only fields and keeps submit disabled until they are filled', async () => {
    renderSetupProfile([setupQueryMock], teacherInfo);

    expect(await screen.findByRole('heading', { name: 'Set up your profile' })).toBeVisible();
    expect(screen.getByLabelText(/specialty/i)).toBeVisible();
    expect(screen.getByLabelText(/bio/i)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});

describe('SetupProfile submit flow', () => {
  beforeEach(() => {
    // The success path redirects with `window.location.href = '/catalog'`, which jsdom
    // cannot navigate, stub it so the assertion can read the assigned URL.
    vi.stubGlobal('location', { href: 'http://localhost:3000/' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits the trimmed form values and redirects to the catalog', async () => {
    renderSetupProfile([setupQueryMock, successMock({ nickname: 'kareem' })]);

    expect(await screen.findByRole('heading', { name: 'Set up your profile' })).toBeVisible();

    const nicknameInput = screen.getByLabelText(/nickname/i);
    await userEvent.clear(nicknameInput);
    await userEvent.type(nicknameInput, '  kareem  ');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(window.location.href).toBe('/catalog'));
  });

  it('sends the nationality picked in the autocomplete to the mutation', async () => {
    renderSetupProfile([setupQueryMock, successMock({ nationalityId: '2' })]);

    expect(await screen.findByRole('heading', { name: 'Set up your profile' })).toBeVisible();

    await userEvent.click(screen.getByLabelText(/nationality/i));
    await userEvent.click(await screen.findByRole('option', { name: 'France' }));

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(window.location.href).toBe('/catalog'));
  });

  it('shows the max-subjects toaster when the mutation reports that error', async () => {
    renderSetupProfile([
      setupQueryMock,
      updateMock({}, { success: false, errors: [{ message: 'MAX_SUBJECTS_EXCEEDED' }] }),
    ]);

    await submitForm();

    expect(await screen.findByRole('status')).toHaveTextContent(
      'You can choose up to 3 specialty subjects.',
    );
    expect(window.location.href).toBe('http://localhost:3000/');
  });
});
