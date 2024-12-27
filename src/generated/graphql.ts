import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

/** The properties of the account */
export type Account = {
  __typename?: 'Account';
  /** The role of the account. */
  accountRole: AccountRole;
  /** The avatar url of this account (provided by the openid-provider) */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** The bio of the teacher. */
  bio?: Maybe<Scalars['String']['output']>;
  /** The current country the user stated to live in. */
  country?: Maybe<Country>;
  /** The date of birth of this account */
  date_of_birth?: Maybe<Scalars['Date']['output']>;
  /** A detailed overview about this teacher. */
  description?: Maybe<Scalars['String']['output']>;
  /** The first name of the account */
  first_name?: Maybe<Scalars['String']['output']>;
  /** The gender of the account */
  gender?: Maybe<Gender>;
  /** A unique id of this account */
  id: Scalars['ID']['output'];
  /** The last name of the account */
  last_name?: Maybe<Scalars['String']['output']>;
  /** The name of the account */
  name?: Maybe<Scalars['String']['output']>;
  /** The nationality of the user */
  nationality?: Maybe<Country>;
  /** The nickname of the account */
  nickname?: Maybe<Scalars['String']['output']>;
  /** The preferred language for the account */
  preferredLanguage: Scalars['String']['output'];
  /** Represents the subjects a teacher is specialized in for teaching. */
  subjects: Array<Subject>;
};

/** Input for updating an account information */
export type AccountInfoInput = {
  /** The current country of the user */
  countryId: Scalars['ID']['input'];
  /** The date of birth of the user. */
  dateOfBirth: Scalars['Date']['input'];
  /** The first name of the user. */
  firstName: Scalars['String']['input'];
  /** The gender of the user. */
  gender: Gender;
  /** The last name of the user. */
  lastName: Scalars['String']['input'];
  /** The nationality of the user */
  nationalityId: Scalars['ID']['input'];
  /** The nickname name of the user. */
  nickname: Scalars['String']['input'];
  /** The preferred language for the user. */
  selectedLanguage: Scalars['String']['input'];
  /** The short bio about the teacher. */
  teacherBio?: InputMaybe<Scalars['String']['input']>;
  /** The short description about the teacher. */
  teacherDescription?: InputMaybe<Scalars['String']['input']>;
  /** List of subject IDs a teacher is specialized in for teaching. */
  teacherSpecialties?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** The role of the account. */
export enum AccountRole {
  Student = 'student',
  Teacher = 'teacher'
}

/** The result of the changeProfilePicture mutation. */
export type ChangeProfilePictureResult = {
  __typename?: 'ChangeProfilePictureResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
  /** The updated user information. */
  user?: Maybe<Account>;
};

/** The country info */
export type Country = {
  __typename?: 'Country';
  /** The name of this country */
  denomination: Scalars['String']['output'];
  /** A unique id of this country */
  id: Scalars['ID']['output'];
  /** The iso code of this country */
  iso: Scalars['String']['output'];
  /** The iso3 code of this country */
  iso3?: Maybe<Scalars['String']['output']>;
  /** The num_code code of this country */
  num_code?: Maybe<Scalars['String']['output']>;
  /** The phone_code code of this country */
  phone_code: Scalars['String']['output'];
};

/** An object type that wraps an error */
export type Error = {
  __typename?: 'Error';
  /** The message of this error. */
  message: Scalars['String']['output'];
};

/** Gender of the account. */
export enum Gender {
  Female = 'female',
  Male = 'male',
  Unknown = 'unknown'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Change the profile picture of a user. */
  changeProfilePicture?: Maybe<ChangeProfilePictureResult>;
  /** Remove the profile picture of a user. */
  removeProfilePicture?: Maybe<ChangeProfilePictureResult>;
  /** Updates a user account information. */
  updateAccountInfo?: Maybe<MutationResult>;
  /** Updates a user profile details. */
  updateProfile?: Maybe<UpdateProfileResult>;
};


export type MutationChangeProfilePictureArgs = {
  profilePictureDetails: ProfilePictureDetailsInput;
};


export type MutationUpdateAccountInfoArgs = {
  accountInfo: AccountInfoInput;
};


export type MutationUpdateProfileArgs = {
  profileDetails: ProfileDetailsInput;
};

/** The result of a mutation. */
export type MutationResult = {
  __typename?: 'MutationResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The open id client providers to use for auth */
export type OpenidClient = {
  __typename?: 'OpenidClient';
  /** The button background color of the OIDC */
  button_background_color?: Maybe<Scalars['String']['output']>;
  /** The icon of the OIDC that should be displayed on the button */
  button_icon?: Maybe<Scalars['String']['output']>;
  /** The text of the OIDC that should be displayed on the button */
  button_text?: Maybe<Scalars['String']['output']>;
  /** A unique id of this OIDC */
  id: Scalars['ID']['output'];
  /** The openId provider */
  identity_provider: Scalars['String']['output'];
};

/** Input for updating the user profile details */
export type ProfileDetailsInput = {
  /** The current country of the user */
  countryId?: InputMaybe<Scalars['ID']['input']>;
  /** The date of birth of the user. */
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  /** The first name of the user. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The gender of the user. */
  gender?: InputMaybe<Gender>;
  /** The last name of the user. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The nationality of the user */
  nationalityId?: InputMaybe<Scalars['ID']['input']>;
  /** The nickname name of the user. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** The preferred language for the user */
  selectedLanguage?: InputMaybe<Scalars['String']['input']>;
  /** The short bio about the teacher. */
  teacherBio?: InputMaybe<Scalars['String']['input']>;
  /** The short description about the teacher. */
  teacherDescription?: InputMaybe<Scalars['String']['input']>;
  /** List of subject IDs a teacher is specialized in for teaching. */
  teacherSpecialties?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Input for updating an account information */
export type ProfilePictureDetailsInput = {
  /** The file path in the bucket. */
  filePath: Scalars['String']['input'];
  /** The file size in bytes of this file. */
  fileSize: Scalars['Int']['input'];
  /** The mime type of the file. */
  mimeType: Scalars['String']['input'];
  /** The original file name. */
  originalFileName: Scalars['String']['input'];
  /** The uuid of the file. */
  uuid: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** List of countries */
  countries: Array<Country>;
  /** The current user */
  me: Account;
  /** List of OpenId clients */
  openIdClients: Array<OpenidClient>;
  /** List of subjects */
  subjects: Array<Subject>;
};

/** The subject info */
export type Subject = {
  __typename?: 'Subject';
  /** The name of this subject. */
  denomination: Scalars['String']['output'];
  /** A unique id of this subject. */
  id: Scalars['ID']['output'];
};

/** The result of the updateProfile mutation. */
export type UpdateProfileResult = {
  __typename?: 'UpdateProfileResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
  /** The updated user information. */
  user?: Maybe<Account>;
};

export type OpenidClientFragment = { __typename?: 'OpenidClient', id: string, button_text?: string | null, button_icon?: string | null, button_background_color?: string | null, identity_provider: string };

export type OpenIdClientQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenIdClientQuery = { __typename?: 'Query', openIdClients: Array<{ __typename?: 'OpenidClient', id: string, button_text?: string | null, button_icon?: string | null, button_background_color?: string | null, identity_provider: string }> };

export type CountryFragment = { __typename?: 'Country', id: string, denomination: string };

export type SubjectFragment = { __typename?: 'Subject', id: string, denomination: string };

export type SetupProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SetupProfileQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, denomination: string }>, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> };

export type UpdateAccountInfoMutationVariables = Exact<{
  accountInfo: AccountInfoInput;
}>;


export type UpdateAccountInfoMutation = { __typename?: 'Mutation', updateAccountInfo?: { __typename?: 'MutationResult', success: boolean, errors: Array<{ __typename?: 'Error', message: string }> } | null };

export type AccountInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountInfoQuery = { __typename?: 'Query', me: { __typename?: 'Account', nickname?: string | null, gender?: Gender | null, avatar_url?: string | null, accountRole: AccountRole } };

export type AccountFragment = { __typename?: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string, denomination: string, iso: string } | null, nationality?: { __typename?: 'Country', id: string, denomination: string, iso: string } | null, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string, denomination: string, iso: string } | null, nationality?: { __typename?: 'Country', id: string, denomination: string, iso: string } | null, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> } };

export type UserFragment = { __typename?: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string, denomination: string } | null, nationality?: { __typename?: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', me: { __typename?: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string, denomination: string } | null, nationality?: { __typename?: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> }, countries: Array<{ __typename?: 'Country', id: string, denomination: string }>, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> };

export type UpdateProfileMutationVariables = Exact<{
  profileDetails: ProfileDetailsInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'UpdateProfileResult', success: boolean, errors: Array<{ __typename?: 'Error', message: string }>, user?: { __typename?: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string, denomination: string } | null, nationality?: { __typename?: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename?: 'Subject', id: string, denomination: string }> } | null } | null };

export type ChangeProfilePictureMutationVariables = Exact<{
  profilePictureDetails: ProfilePictureDetailsInput;
}>;


export type ChangeProfilePictureMutation = { __typename?: 'Mutation', changeProfilePicture?: { __typename?: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename?: 'Error', message: string }>, user?: { __typename?: 'Account', id: string, avatar_url?: string | null } | null } | null };

export type RemoveProfilePictureMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfilePictureMutation = { __typename?: 'Mutation', removeProfilePicture?: { __typename?: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename?: 'Error', message: string }>, user?: { __typename?: 'Account', id: string, avatar_url?: string | null } | null } | null };

export const OpenidClientFragmentDoc = gql`
    fragment OpenidClient on OpenidClient {
  id
  button_text
  button_icon
  button_background_color
  identity_provider
}
    `;
export const CountryFragmentDoc = gql`
    fragment Country on Country {
  id
  denomination
}
    `;
export const SubjectFragmentDoc = gql`
    fragment Subject on Subject {
  id
  denomination
}
    `;
export const AccountFragmentDoc = gql`
    fragment Account on Account {
  id
  name
  nickname
  first_name
  last_name
  gender
  date_of_birth
  avatar_url
  country {
    id
    denomination
    iso
  }
  nationality {
    id
    denomination
    iso
  }
  preferredLanguage
  accountRole
  bio
  description
  subjects {
    id
    denomination
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on Account {
  id
  name
  nickname
  first_name
  last_name
  gender
  date_of_birth
  avatar_url
  country {
    id
    denomination
  }
  nationality {
    id
    denomination
  }
  accountRole
  preferredLanguage
  bio
  description
  subjects {
    id
    denomination
  }
}
    `;
export const OpenIdClientDocument = gql`
    query OpenIdClient {
  openIdClients {
    ...OpenidClient
  }
}
    ${OpenidClientFragmentDoc}`;

/**
 * __useOpenIdClientQuery__
 *
 * To run a query within a React component, call `useOpenIdClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpenIdClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpenIdClientQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpenIdClientQuery(baseOptions?: Apollo.QueryHookOptions<OpenIdClientQuery, OpenIdClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpenIdClientQuery, OpenIdClientQueryVariables>(OpenIdClientDocument, options);
      }
export function useOpenIdClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenIdClientQuery, OpenIdClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpenIdClientQuery, OpenIdClientQueryVariables>(OpenIdClientDocument, options);
        }
export function useOpenIdClientSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpenIdClientQuery, OpenIdClientQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpenIdClientQuery, OpenIdClientQueryVariables>(OpenIdClientDocument, options);
        }
export type OpenIdClientQueryHookResult = ReturnType<typeof useOpenIdClientQuery>;
export type OpenIdClientLazyQueryHookResult = ReturnType<typeof useOpenIdClientLazyQuery>;
export type OpenIdClientSuspenseQueryHookResult = ReturnType<typeof useOpenIdClientSuspenseQuery>;
export type OpenIdClientQueryResult = Apollo.QueryResult<OpenIdClientQuery, OpenIdClientQueryVariables>;
export const SetupProfileDocument = gql`
    query SetupProfile {
  countries {
    ...Country
  }
  subjects {
    ...Subject
  }
}
    ${CountryFragmentDoc}
${SubjectFragmentDoc}`;

/**
 * __useSetupProfileQuery__
 *
 * To run a query within a React component, call `useSetupProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetupProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetupProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetupProfileQuery(baseOptions?: Apollo.QueryHookOptions<SetupProfileQuery, SetupProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SetupProfileQuery, SetupProfileQueryVariables>(SetupProfileDocument, options);
      }
export function useSetupProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SetupProfileQuery, SetupProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SetupProfileQuery, SetupProfileQueryVariables>(SetupProfileDocument, options);
        }
export function useSetupProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SetupProfileQuery, SetupProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SetupProfileQuery, SetupProfileQueryVariables>(SetupProfileDocument, options);
        }
export type SetupProfileQueryHookResult = ReturnType<typeof useSetupProfileQuery>;
export type SetupProfileLazyQueryHookResult = ReturnType<typeof useSetupProfileLazyQuery>;
export type SetupProfileSuspenseQueryHookResult = ReturnType<typeof useSetupProfileSuspenseQuery>;
export type SetupProfileQueryResult = Apollo.QueryResult<SetupProfileQuery, SetupProfileQueryVariables>;
export const UpdateAccountInfoDocument = gql`
    mutation UpdateAccountInfo($accountInfo: AccountInfoInput!) {
  updateAccountInfo(accountInfo: $accountInfo) {
    success
    errors {
      message
    }
  }
}
    `;
export type UpdateAccountInfoMutationFn = Apollo.MutationFunction<UpdateAccountInfoMutation, UpdateAccountInfoMutationVariables>;

/**
 * __useUpdateAccountInfoMutation__
 *
 * To run a mutation, you first call `useUpdateAccountInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountInfoMutation, { data, loading, error }] = useUpdateAccountInfoMutation({
 *   variables: {
 *      accountInfo: // value for 'accountInfo'
 *   },
 * });
 */
export function useUpdateAccountInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountInfoMutation, UpdateAccountInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountInfoMutation, UpdateAccountInfoMutationVariables>(UpdateAccountInfoDocument, options);
      }
export type UpdateAccountInfoMutationHookResult = ReturnType<typeof useUpdateAccountInfoMutation>;
export type UpdateAccountInfoMutationResult = Apollo.MutationResult<UpdateAccountInfoMutation>;
export type UpdateAccountInfoMutationOptions = Apollo.BaseMutationOptions<UpdateAccountInfoMutation, UpdateAccountInfoMutationVariables>;
export const AccountInfoDocument = gql`
    query AccountInfo {
  me {
    nickname
    gender
    avatar_url
    accountRole
  }
}
    `;

/**
 * __useAccountInfoQuery__
 *
 * To run a query within a React component, call `useAccountInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountInfoQuery(baseOptions?: Apollo.QueryHookOptions<AccountInfoQuery, AccountInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountInfoQuery, AccountInfoQueryVariables>(AccountInfoDocument, options);
      }
export function useAccountInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountInfoQuery, AccountInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountInfoQuery, AccountInfoQueryVariables>(AccountInfoDocument, options);
        }
export function useAccountInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccountInfoQuery, AccountInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountInfoQuery, AccountInfoQueryVariables>(AccountInfoDocument, options);
        }
export type AccountInfoQueryHookResult = ReturnType<typeof useAccountInfoQuery>;
export type AccountInfoLazyQueryHookResult = ReturnType<typeof useAccountInfoLazyQuery>;
export type AccountInfoSuspenseQueryHookResult = ReturnType<typeof useAccountInfoSuspenseQuery>;
export type AccountInfoQueryResult = Apollo.QueryResult<AccountInfoQuery, AccountInfoQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Account
  }
}
    ${AccountFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile {
  me {
    ...User
  }
  countries {
    id
    denomination
  }
  subjects {
    id
    denomination
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export function useUserProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileSuspenseQueryHookResult = ReturnType<typeof useUserProfileSuspenseQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($profileDetails: ProfileDetailsInput!) {
  updateProfile(profileDetails: $profileDetails) {
    success
    errors {
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      profileDetails: // value for 'profileDetails'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ChangeProfilePictureDocument = gql`
    mutation ChangeProfilePicture($profilePictureDetails: ProfilePictureDetailsInput!) {
  changeProfilePicture(profilePictureDetails: $profilePictureDetails) {
    success
    errors {
      message
    }
    user {
      id
      avatar_url
    }
  }
}
    `;
export type ChangeProfilePictureMutationFn = Apollo.MutationFunction<ChangeProfilePictureMutation, ChangeProfilePictureMutationVariables>;

/**
 * __useChangeProfilePictureMutation__
 *
 * To run a mutation, you first call `useChangeProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfilePictureMutation, { data, loading, error }] = useChangeProfilePictureMutation({
 *   variables: {
 *      profilePictureDetails: // value for 'profilePictureDetails'
 *   },
 * });
 */
export function useChangeProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfilePictureMutation, ChangeProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfilePictureMutation, ChangeProfilePictureMutationVariables>(ChangeProfilePictureDocument, options);
      }
export type ChangeProfilePictureMutationHookResult = ReturnType<typeof useChangeProfilePictureMutation>;
export type ChangeProfilePictureMutationResult = Apollo.MutationResult<ChangeProfilePictureMutation>;
export type ChangeProfilePictureMutationOptions = Apollo.BaseMutationOptions<ChangeProfilePictureMutation, ChangeProfilePictureMutationVariables>;
export const RemoveProfilePictureDocument = gql`
    mutation RemoveProfilePicture {
  removeProfilePicture {
    success
    errors {
      message
    }
    user {
      id
      avatar_url
    }
  }
}
    `;
export type RemoveProfilePictureMutationFn = Apollo.MutationFunction<RemoveProfilePictureMutation, RemoveProfilePictureMutationVariables>;

/**
 * __useRemoveProfilePictureMutation__
 *
 * To run a mutation, you first call `useRemoveProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfilePictureMutation, { data, loading, error }] = useRemoveProfilePictureMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfilePictureMutation, RemoveProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfilePictureMutation, RemoveProfilePictureMutationVariables>(RemoveProfilePictureDocument, options);
      }
export type RemoveProfilePictureMutationHookResult = ReturnType<typeof useRemoveProfilePictureMutation>;
export type RemoveProfilePictureMutationResult = Apollo.MutationResult<RemoveProfilePictureMutation>;
export type RemoveProfilePictureMutationOptions = Apollo.BaseMutationOptions<RemoveProfilePictureMutation, RemoveProfilePictureMutationVariables>;