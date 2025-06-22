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
  __typename: 'Account';
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
  __typename: 'ChangeProfilePictureResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
  /** The updated user information. */
  user?: Maybe<Account>;
};

/** The parent table name of the component */
export enum ComponentParentType {
  Lesson = 'lesson'
}

/** The type of the component. */
export enum ComponentType {
  Text = 'text',
  Video = 'video'
}

/** A content component which can be of various types. */
export type ContentComponent = TextContent | VideoContent;

export type ContentComponentBaseInput = {
  /** The denomination of the component. */
  denomination: Scalars['String']['input'];
  /** A flag indicating whether the component is published. */
  isPublished: Scalars['Boolean']['input'];
  /** A flag indicating whether the component is required to continue. */
  isRequired: Scalars['Boolean']['input'];
  /** The ID of the parent of the component. */
  parentId: Scalars['ID']['input'];
  /** The parent table name of the component */
  parentType: ComponentParentType;
  /** The type of the component. */
  type: ComponentType;
};

/** The country info */
export type Country = {
  __typename: 'Country';
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

/** The course info. */
export type Course = {
  __typename: 'Course';
  /** The date of when this course was created. */
  created_at: Scalars['Date']['output'];
  /** The denomination of this course. */
  denomination: Scalars['String']['output'];
  /** The description of this course. */
  description: Scalars['String']['output'];
  /** The end date of the course */
  end_date?: Maybe<Scalars['Date']['output']>;
  /** A link to an external meeting. */
  external_meeting_link?: Maybe<Scalars['String']['output']>;
  /** A link to an external resource. */
  external_resource_link?: Maybe<Scalars['String']['output']>;
  /** A unique id of this course. */
  id: Scalars['ID']['output'];
  /** The image of this course */
  image?: Maybe<Scalars['String']['output']>;
  /** The name of the instructor for this course */
  instructor: Teacher;
  /** A flag to indicate whether this course is published or not */
  is_published: Scalars['Boolean']['output'];
  /** The language of this course */
  language: Scalars['String']['output'];
  /** The difficulty level of this course. */
  level: CourseLevel;
  /** The objectives of this course. */
  objectives: Array<CourseObjective>;
  /** The number of participants enrolled in this course (or completed it) */
  participationCount: Scalars['Int']['output'];
  /** Average star rating for this course */
  rating: Scalars['Float']['output'];
  /** Total number of ratings for this course */
  ratingsCount: Scalars['Int']['output'];
  /** The requirements of this course. */
  requirements: Array<CourseRequirement>;
  /** The reviews of this course. */
  reviews: Array<CourseReview>;
  /** The sections of this course. */
  sections: Array<CourseSection>;
  /** A unique slug of this course. */
  slug: Scalars['String']['output'];
  /** The start date of the course */
  start_date?: Maybe<Scalars['Date']['output']>;
  /** The status of the course for the current user */
  status: CourseStatus;
  /** The subjects linked to this course. */
  subjects: Array<Subject>;
  /** The subtitle of this course. */
  subtitle: Scalars['String']['output'];
  /** The date of when this course was last updated. */
  updated_at: Scalars['Date']['output'];
  /** Review by the current viewer for this course */
  viewerReview?: Maybe<CourseReview>;
};

/** Input for createing a course record. */
export type CourseInfoInput = {
  /** The denomination of this course. */
  denomination: Scalars['String']['input'];
  /** The description of this course. */
  description: Scalars['String']['input'];
  /** The end date of the course. */
  end_date?: InputMaybe<Scalars['Date']['input']>;
  /** A link to an external meeting. */
  external_meeting_link?: InputMaybe<Scalars['String']['input']>;
  /** A link to an external resource. */
  external_resource_link?: InputMaybe<Scalars['String']['input']>;
  /** The image of this course. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** A flag to indicate whether this course is published or not. */
  is_published: Scalars['Boolean']['input'];
  /** The language of this course. */
  language: Scalars['String']['input'];
  /** The difficulty level of this course. */
  level: CourseLevel;
  /** List of objectives for the course */
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  /** List of requirements for the course */
  requirements?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The slug of this course. */
  slug: Scalars['String']['input'];
  /** The start date of the course. */
  start_date?: InputMaybe<Scalars['Date']['input']>;
  /** List of subject IDs to associate with the course */
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The subtitle of this course. */
  subtitle: Scalars['String']['input'];
};

/** The difficulty level of a course. */
export enum CourseLevel {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Intermediate = 'intermediate'
}

/** The course objective info */
export type CourseObjective = {
  __typename: 'CourseObjective';
  /** A unique id of this course objective. */
  id: Scalars['ID']['output'];
  /** The objective of this course. */
  objective: Scalars['String']['output'];
};

/** Input for a course objective record. */
export type CourseObjectiveInput = {
  /** A unique id of this course objective. */
  id: Scalars['ID']['input'];
  /** The objective of this course. */
  objective: Scalars['String']['input'];
};

/** The course requirement info */
export type CourseRequirement = {
  __typename: 'CourseRequirement';
  /** A unique id of this course requirement. */
  id: Scalars['ID']['output'];
  /** The requirement of this course. */
  requirement: Scalars['String']['output'];
};

/** Input for a course requirement record. */
export type CourseRequirementInput = {
  /** A unique id of this course requirement. */
  id: Scalars['ID']['input'];
  /** The requirement of this course. */
  requirement: Scalars['String']['input'];
};

/** The review details of a course */
export type CourseReview = {
  __typename: 'CourseReview';
  /** The date when the review was created */
  created_at: Scalars['Date']['output'];
  /** Id of this course review */
  id: Scalars['ID']['output'];
  /** Whether the review can be edited by the user */
  isEditable: Scalars['Boolean']['output'];
  /** 1-5 star rating value given by the reviewer */
  rating: Scalars['Float']['output'];
  /** The review text given by the reviewer */
  review: Scalars['String']['output'];
  reviewer: PublicAccount;
};

/** The course section info */
export type CourseSection = {
  __typename: 'CourseSection';
  /** The denomination of this course section */
  denomination: Scalars['String']['output'];
  /** A unique id of this course section. */
  id: Scalars['ID']['output'];
  /** A flag to indicate whether this course section is published or not */
  is_published: Scalars['Boolean']['output'];
  /** The course section items */
  items: Array<CourseSectionItem>;
  /** The rank of this course section */
  rank: Scalars['Int']['output'];
};

/** Input for createing a course section record. */
export type CourseSectionInfoInput = {
  /** The ID of the course. */
  courseId: Scalars['ID']['input'];
  /** The denomination of this course section. */
  denomination: Scalars['String']['input'];
  /** A flag to indicate whether this course section is published or not. */
  is_published: Scalars['Boolean']['input'];
};

/** Course section item which contains the course curriculum (e.g. lesson) */
export type CourseSectionItem = Lesson;

/** The status of the course for the current user. */
export enum CourseStatus {
  /** This course is available for enrollment. */
  Available = 'available',
  /** This course has been completed by the user. */
  Completed = 'completed',
  /** The user is currently enrolled in this course. */
  Enrolled = 'enrolled',
  /** The user unenrolled from this course. */
  Unenrolled = 'unenrolled'
}

/** Input for updating a course status. */
export type CourseStatusInput = {
  /** The ID of the course */
  id: Scalars['ID']['input'];
  /** The new status of the course */
  status: CourseStatus;
};

/** The result of the creating or updating a content component. */
export type CreateOrUpdateContentComponent = {
  __typename: 'CreateOrUpdateContentComponent';
  /** The created or updated content component. */
  component?: Maybe<ContentComponent>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The result of the creating or updating a course. */
export type CreateOrUpdateCourseResult = {
  __typename: 'CreateOrUpdateCourseResult';
  /** The created or updated course information. */
  course?: Maybe<Course>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The result of the creating or updating a course section. */
export type CreateOrUpdateCourseSectionResult = {
  __typename: 'CreateOrUpdateCourseSectionResult';
  /** The created or updated course section. */
  courseSection?: Maybe<CourseSection>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The result of the creating or updating mutation. */
export type CreateOrUpdateLessonResult = {
  __typename: 'CreateOrUpdateLessonResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The created or updated lesson. */
  lesson?: Maybe<Lesson>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** An object type that wraps an error */
export type Error = {
  __typename: 'Error';
  /** The message of this error. */
  message: Scalars['String']['output'];
};

/** Input for following/unfollowing a teacher */
export type FollowTeacherInput = {
  /** The ID of the teacher to follow/unfollow */
  teacherId: Scalars['String']['input'];
};

/** Result of following/unfollowing a teacher */
export type FollowTeacherResult = {
  __typename: 'FollowTeacherResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Whether the student is now following the teacher */
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Gender of the account. */
export enum Gender {
  Female = 'female',
  Male = 'male',
  Unknown = 'unknown'
}

/** The language info */
export type Language = {
  __typename: 'Language';
  /** The code of this language */
  code: Scalars['String']['output'];
  /** The name of this language */
  denomination: Scalars['String']['output'];
  /** A unique id of this language */
  id: Scalars['ID']['output'];
};

/** The lesson info */
export type Lesson = {
  __typename: 'Lesson';
  /** The content components of this lesson. */
  components: Array<ContentComponent>;
  /** The denomination of this lesson. */
  denomination: Scalars['String']['output'];
  /** The duration of this lesson. */
  duration: Scalars['Int']['output'];
  /** A unique id of this lesson. */
  id: Scalars['ID']['output'];
  /** A flag to indicate whether this lesson is published or not */
  is_published: Scalars['Boolean']['output'];
  /** The ID of the section item this lesson belongs to. */
  itemId: Scalars['ID']['output'];
};

/** Input for createing a lesson record. */
export type LessonInfoInput = {
  /** The ID of the course. */
  courseId: Scalars['ID']['input'];
  /** The denomination of this lesson. */
  denomination: Scalars['String']['input'];
  /** The duration of the lesson in minutes. */
  duration: Scalars['Int']['input'];
  /** A flag to indicate whether this lesson is published or not. */
  is_published: Scalars['Boolean']['input'];
  /** The ID of the section where the lesson item is located. */
  sectionId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Change the profile picture of a user. */
  changeProfilePicture?: Maybe<ChangeProfilePictureResult>;
  /** Creates a content component. */
  createContentComponent?: Maybe<CreateOrUpdateContentComponent>;
  /** Creates a course. */
  createCourse?: Maybe<CreateOrUpdateCourseResult>;
  /** Creates a course section. */
  createCourseSection?: Maybe<CreateOrUpdateCourseSectionResult>;
  /** Creates a lesson. */
  createLesson?: Maybe<CreateOrUpdateLessonResult>;
  /** Deletes a content component. */
  deleteContentComponent?: Maybe<MutationResult>;
  /** Deletes a course. */
  deleteCourse?: Maybe<MutationResult>;
  /** Deletes a course section. */
  deleteCourseSection?: Maybe<MutationResult>;
  /** Deletes a course section item. */
  deleteCourseSectionItem?: Maybe<MutationResult>;
  /** Deletes a lesson. */
  deleteLesson?: Maybe<MutationResult>;
  /** Follow or unfollow a teacher. Toggles the follow status. */
  followTeacher?: Maybe<FollowTeacherResult>;
  /** Rate a course. */
  rateCourse?: Maybe<MutationResult>;
  /** Remove the profile picture of a user. */
  removeProfilePicture?: Maybe<ChangeProfilePictureResult>;
  /** Updates a user account information. */
  updateAccountInfo?: Maybe<MutationResult>;
  /** Updates a content component. */
  updateContentComponent?: Maybe<CreateOrUpdateContentComponent>;
  /** Updates the ranks of multiple content components. */
  updateContentComponentRanks?: Maybe<MutationResult>;
  /** Updates a course. */
  updateCourse?: Maybe<CreateOrUpdateCourseResult>;
  /** Updates a course section. */
  updateCourseSection?: Maybe<CreateOrUpdateCourseSectionResult>;
  /** Updates the ranks of multiple course section items. */
  updateCourseSectionItemRanks?: Maybe<MutationResult>;
  /** Updates the ranks of multiple course sections. */
  updateCourseSectionRanks?: Maybe<MutationResult>;
  /** Updates the status of a course. */
  updateCourseStatus?: Maybe<UpdateCourseStatusResult>;
  /** Updates a lesson. */
  updateLesson?: Maybe<CreateOrUpdateLessonResult>;
  /** Updates a user profile details. */
  updateProfile?: Maybe<UpdateProfileResult>;
};


export type MutationChangeProfilePictureArgs = {
  profilePictureDetails: ProfilePictureDetailsInput;
};


export type MutationCreateContentComponentArgs = {
  baseComponentInfo: ContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
};


export type MutationCreateCourseArgs = {
  courseInfo: CourseInfoInput;
};


export type MutationCreateCourseSectionArgs = {
  courseSectionInfo: CourseSectionInfoInput;
};


export type MutationCreateLessonArgs = {
  lessonInfo: LessonInfoInput;
};


export type MutationDeleteContentComponentArgs = {
  componentId: Scalars['ID']['input'];
  componentType: ComponentType;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCourseSectionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCourseSectionItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFollowTeacherArgs = {
  followTeacherInfo: FollowTeacherInput;
};


export type MutationRateCourseArgs = {
  ratingInfo: RateCourse;
};


export type MutationUpdateAccountInfoArgs = {
  accountInfo: AccountInfoInput;
};


export type MutationUpdateContentComponentArgs = {
  baseComponentInfo: UpdateContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
};


export type MutationUpdateContentComponentRanksArgs = {
  componentRanks: Array<UpdateContentComponentRankInput>;
};


export type MutationUpdateCourseArgs = {
  updateCourseInfo: UpdateCourseInfoInput;
};


export type MutationUpdateCourseSectionArgs = {
  courseSectionInfo: UpdateCourseSectionInfo;
};


export type MutationUpdateCourseSectionItemRanksArgs = {
  sectionItemRanks: Array<UpdateCourseSectionItemRankInput>;
};


export type MutationUpdateCourseSectionRanksArgs = {
  sectionRanks: Array<UpdateCourseSectionRankInput>;
};


export type MutationUpdateCourseStatusArgs = {
  courseStatusInput: CourseStatusInput;
};


export type MutationUpdateLessonArgs = {
  lessonInfo: UpdateLessonInfoInput;
};


export type MutationUpdateProfileArgs = {
  profileDetails: ProfileDetailsInput;
};

/** The result of a mutation. */
export type MutationResult = {
  __typename: 'MutationResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The open id client providers to use for auth */
export type OpenidClient = {
  __typename: 'OpenidClient';
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

/** The properties of a public account */
export type PublicAccount = {
  __typename: 'PublicAccount';
  /** The avatar url of this account */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** The first name of the account */
  first_name?: Maybe<Scalars['String']['output']>;
  /** A unique id of this account */
  id: Scalars['ID']['output'];
  /** The last name of the account */
  last_name?: Maybe<Scalars['String']['output']>;
  /** The name of the account */
  name?: Maybe<Scalars['String']['output']>;
  /** The nickname of the account */
  nickname?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename: 'Query';
  /** List of countries */
  countries: Array<Country>;
  /** Retrieve a course by its slug */
  course?: Maybe<Course>;
  /** Retrieve a course to be edited by the teacher. */
  editableCourse?: Maybe<Course>;
  /** List of languages */
  languages: Array<Language>;
  /** The current user */
  me: Account;
  /** List of OpenId clients */
  openIdClients: Array<OpenidClient>;
  /** Retrieve a subject by its id */
  subject?: Maybe<Subject>;
  /** List of subjects */
  subjects: Array<Subject>;
  /** List of subjects that have courses associated with them */
  subjectsListWithLinkedCourses: Array<Subject>;
  /** List of courses created by the teacher */
  teacherCourses: Array<Course>;
};


export type QueryCourseArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEditableCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubjectArgs = {
  id: Scalars['ID']['input'];
};

/** Input for rating a course. */
export type RateCourse = {
  /** The ID of the course. */
  courseId: Scalars['ID']['input'];
  /** star rating value between 1 and 5 */
  rating?: InputMaybe<Scalars['Float']['input']>;
  /** The review text given by the reviewer */
  review?: InputMaybe<Scalars['String']['input']>;
};

/** The subject info */
export type Subject = {
  __typename: 'Subject';
  /** The courses linked to this subject. */
  courses: Array<Course>;
  /** The name of this subject. */
  denomination: Scalars['String']['output'];
  /** A unique id of this subject. */
  id: Scalars['ID']['output'];
};

/** The properties of a teacher account */
export type Teacher = {
  __typename: 'Teacher';
  /** The avatar url of this teacher */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** A short biography of the teacher */
  bio?: Maybe<Scalars['String']['output']>;
  /** A detailed description of the teacher */
  description?: Maybe<Scalars['String']['output']>;
  /** The first name of the teacher */
  first_name?: Maybe<Scalars['String']['output']>;
  /** A unique id of this account */
  id: Scalars['ID']['output'];
  /** Checks if the current user can follow this teacher (blocks self-follow). */
  isAllowedToFollow: Scalars['Boolean']['output'];
  /** Indicates if the current user is following this teacher */
  isFollowed: Scalars['Boolean']['output'];
  /** The last name of the teacher */
  last_name?: Maybe<Scalars['String']['output']>;
  /** The name of the teacher */
  name?: Maybe<Scalars['String']['output']>;
  /** The nickname of the teacher */
  nickname?: Maybe<Scalars['String']['output']>;
};

/** A text content component. */
export type TextContent = {
  __typename: 'TextContent';
  /** The id of the component this text content belongs to. */
  component_id: Scalars['ID']['output'];
  /** The text content. */
  content: Scalars['String']['output'];
  /** The denomination of the component. */
  denomination: Scalars['String']['output'];
  /** A unique id of this text content component. */
  id: Scalars['ID']['output'];
  /** A flag indicating whether the component is published */
  is_published: Scalars['Boolean']['output'];
  /** A flag indicating whether the component is required to continue. */
  is_required: Scalars['Boolean']['output'];
  /** The rank of the component */
  rank: Scalars['Int']['output'];
  /** The type of the component. */
  type: ComponentType;
};

export type TextContentInput = {
  /** The text content. */
  content: Scalars['String']['input'];
};

export type UpdateContentComponentBaseInput = {
  /** The denomination of the component. */
  denomination?: InputMaybe<Scalars['String']['input']>;
  /** The content component ID. */
  id: Scalars['ID']['input'];
  /** A flag indicating whether the component is published. */
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag indicating whether the component is required to continue. */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  /** The type of the component. */
  type: ComponentType;
};

/** Input for updating a content component rank */
export type UpdateContentComponentRankInput = {
  /** The ID of the content component */
  id: Scalars['String']['input'];
  /** The new rank of the content component */
  rank: Scalars['Int']['input'];
};

/** Input for updating a course record. */
export type UpdateCourseInfoInput = {
  /** The denomination of this course */
  denomination?: InputMaybe<Scalars['String']['input']>;
  /** The description of this course */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The end date of the course */
  end_date?: InputMaybe<Scalars['Date']['input']>;
  /** A link to an external meeting. */
  external_meeting_link?: InputMaybe<Scalars['String']['input']>;
  /** A link to an external resource. */
  external_resource_link?: InputMaybe<Scalars['String']['input']>;
  /** The ID of this course */
  id: Scalars['ID']['input'];
  /** The image of this course */
  image?: InputMaybe<Scalars['String']['input']>;
  /** A flag to indicate whether this course is published or not */
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  /** The language of this course. */
  language?: InputMaybe<Scalars['String']['input']>;
  /** The difficulty level of this course */
  level?: InputMaybe<CourseLevel>;
  /** List of objectives for the course */
  objectives?: InputMaybe<Array<CourseObjectiveInput>>;
  /** List of requirements for the course */
  requirements?: InputMaybe<Array<CourseRequirementInput>>;
  /** The slug of this course */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The start date of the course */
  start_date?: InputMaybe<Scalars['Date']['input']>;
  /** List of subject IDs to associate with the course */
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The subtitle of this course */
  subtitle?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating a course section record. */
export type UpdateCourseSectionInfo = {
  /** The denomination of this course section. */
  denomination?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the course section. */
  id: Scalars['ID']['input'];
  /** A flag to indicate whether this course section is published or not. */
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for updating a course section item rank */
export type UpdateCourseSectionItemRankInput = {
  /** The ID of the course section item */
  id: Scalars['String']['input'];
  /** The new rank of the course section item */
  rank: Scalars['Int']['input'];
};

/** Input for updating a course section rank */
export type UpdateCourseSectionRankInput = {
  /** The ID of the course section */
  id: Scalars['String']['input'];
  /** The new rank of the course section */
  rank: Scalars['Int']['input'];
};

/** The result of the updateCourseStatus mutation. */
export type UpdateCourseStatusResult = {
  __typename: 'UpdateCourseStatusResult';
  /** The updated course information. */
  course?: Maybe<Course>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Input for updating a lesson record. */
export type UpdateLessonInfoInput = {
  /** The denomination of this lesson. */
  denomination?: InputMaybe<Scalars['String']['input']>;
  /** The duration of the lesson in minutes. */
  duration?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the lesson. */
  id: Scalars['ID']['input'];
  /** A flag to indicate whether this lesson is published or not. */
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The result of the updateProfile mutation. */
export type UpdateProfileResult = {
  __typename: 'UpdateProfileResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
  /** The updated user information. */
  user?: Maybe<Account>;
};

/** A video content component. */
export type VideoContent = {
  __typename: 'VideoContent';
  /** The id of the component this video content belongs to. */
  component_id: Scalars['ID']['output'];
  /** The denomination of the component. */
  denomination: Scalars['String']['output'];
  /** A unique id of this video content component. */
  id: Scalars['ID']['output'];
  /** A flag indicating whether the component is published */
  is_published: Scalars['Boolean']['output'];
  /** A flag indicating whether the component is required to continue. */
  is_required: Scalars['Boolean']['output'];
  /** The rank of the component */
  rank: Scalars['Int']['output'];
  /** The type of the component. */
  type: ComponentType;
  /** The URL of the video. */
  url: Scalars['String']['output'];
};

export type VideoContentInput = {
  /** The URL of the video. */
  url: Scalars['String']['input'];
};

export type OpenidClientFragment = { __typename: 'OpenidClient', id: string, button_text?: string | null, button_icon?: string | null, button_background_color?: string | null, identity_provider: string };

export type OpenIdClientQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenIdClientQuery = { __typename: 'Query', openIdClients: Array<{ __typename: 'OpenidClient', id: string, button_text?: string | null, button_icon?: string | null, button_background_color?: string | null, identity_provider: string }> };

export type CountryFragment = { __typename: 'Country', id: string, denomination: string };

export type SubjectFragment = { __typename: 'Subject', id: string, denomination: string };

export type SetupProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SetupProfileQuery = { __typename: 'Query', countries: Array<{ __typename: 'Country', id: string, denomination: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateAccountInfoMutationVariables = Exact<{
  accountInfo: AccountInfoInput;
}>;


export type UpdateAccountInfoMutation = { __typename: 'Mutation', updateAccountInfo?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type AccountInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountInfoQuery = { __typename: 'Query', me: { __typename: 'Account', nickname?: string | null, gender?: Gender | null, avatar_url?: string | null, accountRole: AccountRole } };

export type AccountFragment = { __typename: 'Account', nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: string | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me: { __typename: 'Account', nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: string | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> } };

export type TextContentComponentFragment = { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string };

export type VideoContentComponentFragment = { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string };

export type CourseSectionFragment = { __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> };

export type CourseReviewFragment = { __typename: 'CourseReview', id: string, rating: number, review: string, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } };

export type CourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: string, level: CourseLevel, image?: string | null, external_resource_link?: string | null, external_meeting_link?: string | null, start_date?: any | null, end_date?: any | null, language: string, updated_at: any, created_at: any, status: CourseStatus, rating: number, ratingsCount: number, participationCount: number, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }>, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> }>, reviews: Array<{ __typename: 'CourseReview', id: string, rating: number, review: string, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, viewerReview?: { __typename: 'CourseReview', id: string, rating: number, review: string, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } } | null, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: string | null, isFollowed: boolean, isAllowedToFollow: boolean } };

export type CourseQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CourseQuery = { __typename: 'Query', course?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: string, level: CourseLevel, image?: string | null, external_resource_link?: string | null, external_meeting_link?: string | null, start_date?: any | null, end_date?: any | null, language: string, updated_at: any, created_at: any, status: CourseStatus, rating: number, ratingsCount: number, participationCount: number, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }>, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> }>, reviews: Array<{ __typename: 'CourseReview', id: string, rating: number, review: string, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, viewerReview?: { __typename: 'CourseReview', id: string, rating: number, review: string, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } } | null, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: string | null, isFollowed: boolean, isAllowedToFollow: boolean } } | null };

export type UpdateCourseStatusMutationVariables = Exact<{
  courseStatusInput: CourseStatusInput;
}>;


export type UpdateCourseStatusMutation = { __typename: 'Mutation', updateCourseStatus?: { __typename: 'UpdateCourseStatusResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, status: CourseStatus } | null } | null };

export type FollowTeacherMutationVariables = Exact<{
  followTeacherInfo: FollowTeacherInput;
}>;


export type FollowTeacherMutation = { __typename: 'Mutation', followTeacher?: { __typename: 'FollowTeacherResult', success: boolean, isFollowing?: boolean | null, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type LanguageFragment = { __typename: 'Language', id: string, denomination: string, code: string };

export type CreateCoursePageQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateCoursePageQuery = { __typename: 'Query', languages: Array<{ __typename: 'Language', id: string, denomination: string, code: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type CreateCourseMutationVariables = Exact<{
  courseInfo: CourseInfoInput;
}>;


export type CreateCourseMutation = { __typename: 'Mutation', createCourse?: { __typename: 'CreateOrUpdateCourseResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, slug: string } | null } | null };

export type EditableTextContentComponentFragment = { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string };

export type EditableVideoContentComponentFragment = { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string };

export type EditableLessonFragment = { __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> };

export type SectionFragment = { __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> };

export type EditableCourseSectionItemFragment = { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> }> };

export type EditableCourseSectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableCourseSectionQuery = { __typename: 'Query', editableCourse?: { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<{ __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }> }> }> } | null };

export type CreateLessonMutationVariables = Exact<{
  lessonInfo: LessonInfoInput;
}>;


export type CreateLessonMutation = { __typename: 'Mutation', createLesson?: { __typename: 'CreateOrUpdateLessonResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, lesson?: { __typename: 'Lesson', id: string, denomination: string, duration: number, is_published: boolean } | null } | null };

export type UpdateLessonMutationVariables = Exact<{
  lessonInfo: UpdateLessonInfoInput;
}>;


export type UpdateLessonMutation = { __typename: 'Mutation', updateLesson?: { __typename: 'CreateOrUpdateLessonResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, lesson?: { __typename: 'Lesson', id: string, denomination: string, duration: number, is_published: boolean } | null } | null };

export type DeleteCourseSectionItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourseSectionItemMutation = { __typename: 'Mutation', deleteCourseSectionItem?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type UpdateCourseSectionItemRanksMutationVariables = Exact<{
  sectionItemRanks: Array<UpdateCourseSectionItemRankInput> | UpdateCourseSectionItemRankInput;
}>;


export type UpdateCourseSectionItemRanksMutation = { __typename: 'Mutation', updateCourseSectionItemRanks?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type DeleteContentComponentMutationVariables = Exact<{
  componentId: Scalars['ID']['input'];
  componentType: ComponentType;
}>;


export type DeleteContentComponentMutation = { __typename: 'Mutation', deleteContentComponent?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type UpdateContentComponentRanksMutationVariables = Exact<{
  componentRanks: Array<UpdateContentComponentRankInput> | UpdateContentComponentRankInput;
}>;


export type UpdateContentComponentRanksMutation = { __typename: 'Mutation', updateContentComponentRanks?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type CreateContentComponentMutationVariables = Exact<{
  baseComponentInfo: ContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
}>;


export type CreateContentComponentMutation = { __typename: 'Mutation', createContentComponent?: { __typename: 'CreateOrUpdateContentComponent', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, component?: { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string } | null } | null };

export type UpdateContentComponentMutationVariables = Exact<{
  baseComponentInfo: UpdateContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
}>;


export type UpdateContentComponentMutation = { __typename: 'Mutation', updateContentComponent?: { __typename: 'CreateOrUpdateContentComponent', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, component?: { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: string, component_id: string } | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string } | null } | null };

export type EditableCourseSectionFragment = { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean }> };

export type EditableCourseSectionsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableCourseSectionsQuery = { __typename: 'Query', editableCourse?: { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean }> } | null };

export type CreateCourseSectionMutationVariables = Exact<{
  courseSectionInfo: CourseSectionInfoInput;
}>;


export type CreateCourseSectionMutation = { __typename: 'Mutation', createCourseSection?: { __typename: 'CreateOrUpdateCourseSectionResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, courseSection?: { __typename: 'CourseSection', id: string, denomination: string, is_published: boolean } | null } | null };

export type UpdateCourseSectionMutationVariables = Exact<{
  courseSectionInfo: UpdateCourseSectionInfo;
}>;


export type UpdateCourseSectionMutation = { __typename: 'Mutation', updateCourseSection?: { __typename: 'CreateOrUpdateCourseSectionResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, courseSection?: { __typename: 'CourseSection', id: string, denomination: string, is_published: boolean } | null } | null };

export type DeleteCourseSectionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourseSectionMutation = { __typename: 'Mutation', deleteCourseSection?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type UpdateCourseSectionRanksMutationVariables = Exact<{
  sectionRanks: Array<UpdateCourseSectionRankInput> | UpdateCourseSectionRankInput;
}>;


export type UpdateCourseSectionRanksMutation = { __typename: 'Mutation', updateCourseSectionRanks?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type EditableCourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: string, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, external_meeting_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> };

export type EditableCourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableCourseQuery = { __typename: 'Query', editableCourse?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: string, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, external_meeting_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> } | null, languages: Array<{ __typename: 'Language', id: string, denomination: string, code: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateCourseMutationVariables = Exact<{
  updateCourseInfo: UpdateCourseInfoInput;
}>;


export type UpdateCourseMutation = { __typename: 'Mutation', updateCourse?: { __typename: 'CreateOrUpdateCourseResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: string, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, external_meeting_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> } | null } | null };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourseMutation = { __typename: 'Mutation', deleteCourse?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type TeacherCourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, is_published: boolean, created_at: any, updated_at: any };

export type TeacherCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherCoursesQuery = { __typename: 'Query', teacherCourses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, is_published: boolean, created_at: any, updated_at: any }> };

export type ExploreSubjectFragment = { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, participationCount: number }> };

export type ExploreQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreQuery = { __typename: 'Query', subjectsListWithLinkedCourses: Array<{ __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, participationCount: number }> }> };

export type UserFragment = { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename: 'Query', me: { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> }, countries: Array<{ __typename: 'Country', id: string, denomination: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateProfileMutationVariables = Exact<{
  profileDetails: ProfileDetailsInput;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile?: { __typename: 'UpdateProfileResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: string | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> } | null } | null };

export type ChangeProfilePictureMutationVariables = Exact<{
  profilePictureDetails: ProfilePictureDetailsInput;
}>;


export type ChangeProfilePictureMutation = { __typename: 'Mutation', changeProfilePicture?: { __typename: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, avatar_url?: string | null } | null } | null };

export type RemoveProfilePictureMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfilePictureMutation = { __typename: 'Mutation', removeProfilePicture?: { __typename: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, avatar_url?: string | null } | null } | null };

export type SubjectCourseFragment = { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> };

export type SubjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SubjectQuery = { __typename: 'Query', subject?: { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> } | null };

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
export const TextContentComponentFragmentDoc = gql`
    fragment TextContentComponent on TextContent {
  id
  type
  denomination
  is_published
  is_required
  content
  component_id
}
    `;
export const VideoContentComponentFragmentDoc = gql`
    fragment VideoContentComponent on VideoContent {
  id
  type
  denomination
  is_published
  is_required
  url
  component_id
}
    `;
export const CourseSectionFragmentDoc = gql`
    fragment CourseSection on CourseSection {
  id
  denomination
  is_published
  rank
  items {
    ... on Lesson {
      id
      itemId
      denomination
      duration
      is_published
      components {
        ... on TextContent {
          ...TextContentComponent
        }
        ... on VideoContent {
          ...VideoContentComponent
        }
      }
    }
  }
}
    ${TextContentComponentFragmentDoc}
${VideoContentComponentFragmentDoc}`;
export const CourseReviewFragmentDoc = gql`
    fragment CourseReview on CourseReview {
  id
  rating
  review
  created_at
  reviewer {
    id
    first_name
    last_name
    avatar_url
  }
  isEditable
}
    `;
export const CourseFragmentDoc = gql`
    fragment Course on Course {
  id
  denomination
  slug
  subtitle
  description
  level
  image
  external_resource_link
  external_meeting_link
  start_date
  end_date
  language
  updated_at
  created_at
  status
  subjects {
    id
    denomination
  }
  objectives {
    id
    objective
  }
  requirements {
    id
    requirement
  }
  sections {
    ...CourseSection
  }
  rating
  ratingsCount
  reviews {
    ...CourseReview
  }
  viewerReview {
    ...CourseReview
  }
  instructor {
    id
    first_name
    last_name
    avatar_url
    description
    isFollowed
    isAllowedToFollow
  }
  participationCount
}
    ${CourseSectionFragmentDoc}
${CourseReviewFragmentDoc}`;
export const LanguageFragmentDoc = gql`
    fragment Language on Language {
  id
  denomination
  code
}
    `;
export const EditableTextContentComponentFragmentDoc = gql`
    fragment EditableTextContentComponent on TextContent {
  id
  type
  denomination
  is_published
  is_required
  content
  component_id
}
    `;
export const EditableVideoContentComponentFragmentDoc = gql`
    fragment EditableVideoContentComponent on VideoContent {
  id
  type
  denomination
  is_published
  is_required
  url
  component_id
}
    `;
export const EditableLessonFragmentDoc = gql`
    fragment EditableLesson on Lesson {
  id
  itemId
  denomination
  duration
  is_published
  components {
    ... on TextContent {
      ...EditableTextContentComponent
    }
    ... on VideoContent {
      ...EditableVideoContentComponent
    }
  }
}
    ${EditableTextContentComponentFragmentDoc}
${EditableVideoContentComponentFragmentDoc}`;
export const SectionFragmentDoc = gql`
    fragment Section on CourseSection {
  id
  denomination
  items {
    ... on Lesson {
      ...EditableLesson
    }
  }
}
    ${EditableLessonFragmentDoc}`;
export const EditableCourseSectionItemFragmentDoc = gql`
    fragment EditableCourseSectionItem on Course {
  id
  sections {
    ...Section
  }
}
    ${SectionFragmentDoc}`;
export const EditableCourseSectionFragmentDoc = gql`
    fragment EditableCourseSection on Course {
  id
  sections {
    id
    denomination
    is_published
  }
}
    `;
export const EditableCourseFragmentDoc = gql`
    fragment EditableCourse on Course {
  id
  denomination
  slug
  subtitle
  description
  level
  image
  language
  external_resource_link
  external_meeting_link
  is_published
  start_date
  end_date
  subjects {
    id
    denomination
  }
  objectives {
    id
    objective
  }
  requirements {
    id
    requirement
  }
}
    `;
export const TeacherCourseFragmentDoc = gql`
    fragment TeacherCourse on Course {
  id
  denomination
  slug
  level
  is_published
  created_at
  updated_at
}
    `;
export const ExploreSubjectFragmentDoc = gql`
    fragment ExploreSubject on Subject {
  id
  denomination
  courses {
    id
    participationCount
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
export const SubjectCourseFragmentDoc = gql`
    fragment SubjectCourse on Subject {
  id
  denomination
  courses {
    id
    denomination
    slug
    level
    image
    rating
    participationCount
    instructor {
      first_name
      last_name
      avatar_url
    }
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
export const CourseDocument = gql`
    query Course($slug: String!) {
  course(slug: $slug) {
    ...Course
  }
}
    ${CourseFragmentDoc}`;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables> & ({ variables: CourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export function useCourseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseSuspenseQueryHookResult = ReturnType<typeof useCourseSuspenseQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const UpdateCourseStatusDocument = gql`
    mutation UpdateCourseStatus($courseStatusInput: CourseStatusInput!) {
  updateCourseStatus(courseStatusInput: $courseStatusInput) {
    success
    errors {
      message
    }
    course {
      id
      status
    }
  }
}
    `;
export type UpdateCourseStatusMutationFn = Apollo.MutationFunction<UpdateCourseStatusMutation, UpdateCourseStatusMutationVariables>;

/**
 * __useUpdateCourseStatusMutation__
 *
 * To run a mutation, you first call `useUpdateCourseStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseStatusMutation, { data, loading, error }] = useUpdateCourseStatusMutation({
 *   variables: {
 *      courseStatusInput: // value for 'courseStatusInput'
 *   },
 * });
 */
export function useUpdateCourseStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseStatusMutation, UpdateCourseStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseStatusMutation, UpdateCourseStatusMutationVariables>(UpdateCourseStatusDocument, options);
      }
export type UpdateCourseStatusMutationHookResult = ReturnType<typeof useUpdateCourseStatusMutation>;
export type UpdateCourseStatusMutationResult = Apollo.MutationResult<UpdateCourseStatusMutation>;
export type UpdateCourseStatusMutationOptions = Apollo.BaseMutationOptions<UpdateCourseStatusMutation, UpdateCourseStatusMutationVariables>;
export const FollowTeacherDocument = gql`
    mutation FollowTeacher($followTeacherInfo: FollowTeacherInput!) {
  followTeacher(followTeacherInfo: $followTeacherInfo) {
    success
    errors {
      message
    }
    isFollowing
  }
}
    `;
export type FollowTeacherMutationFn = Apollo.MutationFunction<FollowTeacherMutation, FollowTeacherMutationVariables>;

/**
 * __useFollowTeacherMutation__
 *
 * To run a mutation, you first call `useFollowTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followTeacherMutation, { data, loading, error }] = useFollowTeacherMutation({
 *   variables: {
 *      followTeacherInfo: // value for 'followTeacherInfo'
 *   },
 * });
 */
export function useFollowTeacherMutation(baseOptions?: Apollo.MutationHookOptions<FollowTeacherMutation, FollowTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowTeacherMutation, FollowTeacherMutationVariables>(FollowTeacherDocument, options);
      }
export type FollowTeacherMutationHookResult = ReturnType<typeof useFollowTeacherMutation>;
export type FollowTeacherMutationResult = Apollo.MutationResult<FollowTeacherMutation>;
export type FollowTeacherMutationOptions = Apollo.BaseMutationOptions<FollowTeacherMutation, FollowTeacherMutationVariables>;
export const CreateCoursePageDocument = gql`
    query CreateCoursePage {
  languages {
    ...Language
  }
  subjects {
    id
    denomination
  }
}
    ${LanguageFragmentDoc}`;

/**
 * __useCreateCoursePageQuery__
 *
 * To run a query within a React component, call `useCreateCoursePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateCoursePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateCoursePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateCoursePageQuery(baseOptions?: Apollo.QueryHookOptions<CreateCoursePageQuery, CreateCoursePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateCoursePageQuery, CreateCoursePageQueryVariables>(CreateCoursePageDocument, options);
      }
export function useCreateCoursePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateCoursePageQuery, CreateCoursePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateCoursePageQuery, CreateCoursePageQueryVariables>(CreateCoursePageDocument, options);
        }
export function useCreateCoursePageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CreateCoursePageQuery, CreateCoursePageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CreateCoursePageQuery, CreateCoursePageQueryVariables>(CreateCoursePageDocument, options);
        }
export type CreateCoursePageQueryHookResult = ReturnType<typeof useCreateCoursePageQuery>;
export type CreateCoursePageLazyQueryHookResult = ReturnType<typeof useCreateCoursePageLazyQuery>;
export type CreateCoursePageSuspenseQueryHookResult = ReturnType<typeof useCreateCoursePageSuspenseQuery>;
export type CreateCoursePageQueryResult = Apollo.QueryResult<CreateCoursePageQuery, CreateCoursePageQueryVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($courseInfo: CourseInfoInput!) {
  createCourse(courseInfo: $courseInfo) {
    success
    errors {
      message
    }
    course {
      id
      slug
    }
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      courseInfo: // value for 'courseInfo'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const EditableCourseSectionDocument = gql`
    query EditableCourseSection($id: ID!) {
  editableCourse(id: $id) {
    ...EditableCourseSectionItem
  }
}
    ${EditableCourseSectionItemFragmentDoc}`;

/**
 * __useEditableCourseSectionQuery__
 *
 * To run a query within a React component, call `useEditableCourseSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditableCourseSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditableCourseSectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditableCourseSectionQuery(baseOptions: Apollo.QueryHookOptions<EditableCourseSectionQuery, EditableCourseSectionQueryVariables> & ({ variables: EditableCourseSectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>(EditableCourseSectionDocument, options);
      }
export function useEditableCourseSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>(EditableCourseSectionDocument, options);
        }
export function useEditableCourseSectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>(EditableCourseSectionDocument, options);
        }
export type EditableCourseSectionQueryHookResult = ReturnType<typeof useEditableCourseSectionQuery>;
export type EditableCourseSectionLazyQueryHookResult = ReturnType<typeof useEditableCourseSectionLazyQuery>;
export type EditableCourseSectionSuspenseQueryHookResult = ReturnType<typeof useEditableCourseSectionSuspenseQuery>;
export type EditableCourseSectionQueryResult = Apollo.QueryResult<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($lessonInfo: LessonInfoInput!) {
  createLesson(lessonInfo: $lessonInfo) {
    success
    errors {
      message
    }
    lesson {
      id
      denomination
      duration
      is_published
    }
  }
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      lessonInfo: // value for 'lessonInfo'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = gql`
    mutation UpdateLesson($lessonInfo: UpdateLessonInfoInput!) {
  updateLesson(lessonInfo: $lessonInfo) {
    success
    errors {
      message
    }
    lesson {
      id
      denomination
      duration
      is_published
    }
  }
}
    `;
export type UpdateLessonMutationFn = Apollo.MutationFunction<UpdateLessonMutation, UpdateLessonMutationVariables>;

/**
 * __useUpdateLessonMutation__
 *
 * To run a mutation, you first call `useUpdateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLessonMutation, { data, loading, error }] = useUpdateLessonMutation({
 *   variables: {
 *      lessonInfo: // value for 'lessonInfo'
 *   },
 * });
 */
export function useUpdateLessonMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLessonMutation, UpdateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLessonMutation, UpdateLessonMutationVariables>(UpdateLessonDocument, options);
      }
export type UpdateLessonMutationHookResult = ReturnType<typeof useUpdateLessonMutation>;
export type UpdateLessonMutationResult = Apollo.MutationResult<UpdateLessonMutation>;
export type UpdateLessonMutationOptions = Apollo.BaseMutationOptions<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const DeleteCourseSectionItemDocument = gql`
    mutation DeleteCourseSectionItem($id: ID!) {
  deleteCourseSectionItem(id: $id) {
    success
    errors {
      message
    }
  }
}
    `;
export type DeleteCourseSectionItemMutationFn = Apollo.MutationFunction<DeleteCourseSectionItemMutation, DeleteCourseSectionItemMutationVariables>;

/**
 * __useDeleteCourseSectionItemMutation__
 *
 * To run a mutation, you first call `useDeleteCourseSectionItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseSectionItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseSectionItemMutation, { data, loading, error }] = useDeleteCourseSectionItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseSectionItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseSectionItemMutation, DeleteCourseSectionItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseSectionItemMutation, DeleteCourseSectionItemMutationVariables>(DeleteCourseSectionItemDocument, options);
      }
export type DeleteCourseSectionItemMutationHookResult = ReturnType<typeof useDeleteCourseSectionItemMutation>;
export type DeleteCourseSectionItemMutationResult = Apollo.MutationResult<DeleteCourseSectionItemMutation>;
export type DeleteCourseSectionItemMutationOptions = Apollo.BaseMutationOptions<DeleteCourseSectionItemMutation, DeleteCourseSectionItemMutationVariables>;
export const UpdateCourseSectionItemRanksDocument = gql`
    mutation UpdateCourseSectionItemRanks($sectionItemRanks: [UpdateCourseSectionItemRankInput!]!) {
  updateCourseSectionItemRanks(sectionItemRanks: $sectionItemRanks) {
    success
    errors {
      message
    }
  }
}
    `;
export type UpdateCourseSectionItemRanksMutationFn = Apollo.MutationFunction<UpdateCourseSectionItemRanksMutation, UpdateCourseSectionItemRanksMutationVariables>;

/**
 * __useUpdateCourseSectionItemRanksMutation__
 *
 * To run a mutation, you first call `useUpdateCourseSectionItemRanksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseSectionItemRanksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseSectionItemRanksMutation, { data, loading, error }] = useUpdateCourseSectionItemRanksMutation({
 *   variables: {
 *      sectionItemRanks: // value for 'sectionItemRanks'
 *   },
 * });
 */
export function useUpdateCourseSectionItemRanksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseSectionItemRanksMutation, UpdateCourseSectionItemRanksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseSectionItemRanksMutation, UpdateCourseSectionItemRanksMutationVariables>(UpdateCourseSectionItemRanksDocument, options);
      }
export type UpdateCourseSectionItemRanksMutationHookResult = ReturnType<typeof useUpdateCourseSectionItemRanksMutation>;
export type UpdateCourseSectionItemRanksMutationResult = Apollo.MutationResult<UpdateCourseSectionItemRanksMutation>;
export type UpdateCourseSectionItemRanksMutationOptions = Apollo.BaseMutationOptions<UpdateCourseSectionItemRanksMutation, UpdateCourseSectionItemRanksMutationVariables>;
export const DeleteContentComponentDocument = gql`
    mutation DeleteContentComponent($componentId: ID!, $componentType: ComponentType!) {
  deleteContentComponent(componentId: $componentId, componentType: $componentType) {
    success
    errors {
      message
    }
  }
}
    `;
export type DeleteContentComponentMutationFn = Apollo.MutationFunction<DeleteContentComponentMutation, DeleteContentComponentMutationVariables>;

/**
 * __useDeleteContentComponentMutation__
 *
 * To run a mutation, you first call `useDeleteContentComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContentComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContentComponentMutation, { data, loading, error }] = useDeleteContentComponentMutation({
 *   variables: {
 *      componentId: // value for 'componentId'
 *      componentType: // value for 'componentType'
 *   },
 * });
 */
export function useDeleteContentComponentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContentComponentMutation, DeleteContentComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContentComponentMutation, DeleteContentComponentMutationVariables>(DeleteContentComponentDocument, options);
      }
export type DeleteContentComponentMutationHookResult = ReturnType<typeof useDeleteContentComponentMutation>;
export type DeleteContentComponentMutationResult = Apollo.MutationResult<DeleteContentComponentMutation>;
export type DeleteContentComponentMutationOptions = Apollo.BaseMutationOptions<DeleteContentComponentMutation, DeleteContentComponentMutationVariables>;
export const UpdateContentComponentRanksDocument = gql`
    mutation UpdateContentComponentRanks($componentRanks: [UpdateContentComponentRankInput!]!) {
  updateContentComponentRanks(componentRanks: $componentRanks) {
    success
    errors {
      message
    }
  }
}
    `;
export type UpdateContentComponentRanksMutationFn = Apollo.MutationFunction<UpdateContentComponentRanksMutation, UpdateContentComponentRanksMutationVariables>;

/**
 * __useUpdateContentComponentRanksMutation__
 *
 * To run a mutation, you first call `useUpdateContentComponentRanksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentComponentRanksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentComponentRanksMutation, { data, loading, error }] = useUpdateContentComponentRanksMutation({
 *   variables: {
 *      componentRanks: // value for 'componentRanks'
 *   },
 * });
 */
export function useUpdateContentComponentRanksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentComponentRanksMutation, UpdateContentComponentRanksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentComponentRanksMutation, UpdateContentComponentRanksMutationVariables>(UpdateContentComponentRanksDocument, options);
      }
export type UpdateContentComponentRanksMutationHookResult = ReturnType<typeof useUpdateContentComponentRanksMutation>;
export type UpdateContentComponentRanksMutationResult = Apollo.MutationResult<UpdateContentComponentRanksMutation>;
export type UpdateContentComponentRanksMutationOptions = Apollo.BaseMutationOptions<UpdateContentComponentRanksMutation, UpdateContentComponentRanksMutationVariables>;
export const CreateContentComponentDocument = gql`
    mutation CreateContentComponent($baseComponentInfo: ContentComponentBaseInput!, $textContent: TextContentInput, $videoContent: VideoContentInput) {
  createContentComponent(
    baseComponentInfo: $baseComponentInfo
    textContent: $textContent
    videoContent: $videoContent
  ) {
    success
    errors {
      message
    }
    component {
      ... on TextContent {
        ...EditableTextContentComponent
      }
      ... on VideoContent {
        ...EditableVideoContentComponent
      }
    }
  }
}
    ${EditableTextContentComponentFragmentDoc}
${EditableVideoContentComponentFragmentDoc}`;
export type CreateContentComponentMutationFn = Apollo.MutationFunction<CreateContentComponentMutation, CreateContentComponentMutationVariables>;

/**
 * __useCreateContentComponentMutation__
 *
 * To run a mutation, you first call `useCreateContentComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentComponentMutation, { data, loading, error }] = useCreateContentComponentMutation({
 *   variables: {
 *      baseComponentInfo: // value for 'baseComponentInfo'
 *      textContent: // value for 'textContent'
 *      videoContent: // value for 'videoContent'
 *   },
 * });
 */
export function useCreateContentComponentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentComponentMutation, CreateContentComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentComponentMutation, CreateContentComponentMutationVariables>(CreateContentComponentDocument, options);
      }
export type CreateContentComponentMutationHookResult = ReturnType<typeof useCreateContentComponentMutation>;
export type CreateContentComponentMutationResult = Apollo.MutationResult<CreateContentComponentMutation>;
export type CreateContentComponentMutationOptions = Apollo.BaseMutationOptions<CreateContentComponentMutation, CreateContentComponentMutationVariables>;
export const UpdateContentComponentDocument = gql`
    mutation UpdateContentComponent($baseComponentInfo: UpdateContentComponentBaseInput!, $textContent: TextContentInput, $videoContent: VideoContentInput) {
  updateContentComponent(
    baseComponentInfo: $baseComponentInfo
    textContent: $textContent
    videoContent: $videoContent
  ) {
    success
    errors {
      message
    }
    component {
      ... on TextContent {
        ...EditableTextContentComponent
      }
      ... on VideoContent {
        ...EditableVideoContentComponent
      }
    }
  }
}
    ${EditableTextContentComponentFragmentDoc}
${EditableVideoContentComponentFragmentDoc}`;
export type UpdateContentComponentMutationFn = Apollo.MutationFunction<UpdateContentComponentMutation, UpdateContentComponentMutationVariables>;

/**
 * __useUpdateContentComponentMutation__
 *
 * To run a mutation, you first call `useUpdateContentComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentComponentMutation, { data, loading, error }] = useUpdateContentComponentMutation({
 *   variables: {
 *      baseComponentInfo: // value for 'baseComponentInfo'
 *      textContent: // value for 'textContent'
 *      videoContent: // value for 'videoContent'
 *   },
 * });
 */
export function useUpdateContentComponentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentComponentMutation, UpdateContentComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentComponentMutation, UpdateContentComponentMutationVariables>(UpdateContentComponentDocument, options);
      }
export type UpdateContentComponentMutationHookResult = ReturnType<typeof useUpdateContentComponentMutation>;
export type UpdateContentComponentMutationResult = Apollo.MutationResult<UpdateContentComponentMutation>;
export type UpdateContentComponentMutationOptions = Apollo.BaseMutationOptions<UpdateContentComponentMutation, UpdateContentComponentMutationVariables>;
export const EditableCourseSectionsDocument = gql`
    query EditableCourseSections($id: ID!) {
  editableCourse(id: $id) {
    ...EditableCourseSection
  }
}
    ${EditableCourseSectionFragmentDoc}`;

/**
 * __useEditableCourseSectionsQuery__
 *
 * To run a query within a React component, call `useEditableCourseSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditableCourseSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditableCourseSectionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditableCourseSectionsQuery(baseOptions: Apollo.QueryHookOptions<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables> & ({ variables: EditableCourseSectionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>(EditableCourseSectionsDocument, options);
      }
export function useEditableCourseSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>(EditableCourseSectionsDocument, options);
        }
export function useEditableCourseSectionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>(EditableCourseSectionsDocument, options);
        }
export type EditableCourseSectionsQueryHookResult = ReturnType<typeof useEditableCourseSectionsQuery>;
export type EditableCourseSectionsLazyQueryHookResult = ReturnType<typeof useEditableCourseSectionsLazyQuery>;
export type EditableCourseSectionsSuspenseQueryHookResult = ReturnType<typeof useEditableCourseSectionsSuspenseQuery>;
export type EditableCourseSectionsQueryResult = Apollo.QueryResult<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>;
export const CreateCourseSectionDocument = gql`
    mutation CreateCourseSection($courseSectionInfo: CourseSectionInfoInput!) {
  createCourseSection(courseSectionInfo: $courseSectionInfo) {
    success
    errors {
      message
    }
    courseSection {
      id
      denomination
      is_published
    }
  }
}
    `;
export type CreateCourseSectionMutationFn = Apollo.MutationFunction<CreateCourseSectionMutation, CreateCourseSectionMutationVariables>;

/**
 * __useCreateCourseSectionMutation__
 *
 * To run a mutation, you first call `useCreateCourseSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseSectionMutation, { data, loading, error }] = useCreateCourseSectionMutation({
 *   variables: {
 *      courseSectionInfo: // value for 'courseSectionInfo'
 *   },
 * });
 */
export function useCreateCourseSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseSectionMutation, CreateCourseSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseSectionMutation, CreateCourseSectionMutationVariables>(CreateCourseSectionDocument, options);
      }
export type CreateCourseSectionMutationHookResult = ReturnType<typeof useCreateCourseSectionMutation>;
export type CreateCourseSectionMutationResult = Apollo.MutationResult<CreateCourseSectionMutation>;
export type CreateCourseSectionMutationOptions = Apollo.BaseMutationOptions<CreateCourseSectionMutation, CreateCourseSectionMutationVariables>;
export const UpdateCourseSectionDocument = gql`
    mutation UpdateCourseSection($courseSectionInfo: UpdateCourseSectionInfo!) {
  updateCourseSection(courseSectionInfo: $courseSectionInfo) {
    success
    errors {
      message
    }
    courseSection {
      id
      denomination
      is_published
    }
  }
}
    `;
export type UpdateCourseSectionMutationFn = Apollo.MutationFunction<UpdateCourseSectionMutation, UpdateCourseSectionMutationVariables>;

/**
 * __useUpdateCourseSectionMutation__
 *
 * To run a mutation, you first call `useUpdateCourseSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseSectionMutation, { data, loading, error }] = useUpdateCourseSectionMutation({
 *   variables: {
 *      courseSectionInfo: // value for 'courseSectionInfo'
 *   },
 * });
 */
export function useUpdateCourseSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseSectionMutation, UpdateCourseSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseSectionMutation, UpdateCourseSectionMutationVariables>(UpdateCourseSectionDocument, options);
      }
export type UpdateCourseSectionMutationHookResult = ReturnType<typeof useUpdateCourseSectionMutation>;
export type UpdateCourseSectionMutationResult = Apollo.MutationResult<UpdateCourseSectionMutation>;
export type UpdateCourseSectionMutationOptions = Apollo.BaseMutationOptions<UpdateCourseSectionMutation, UpdateCourseSectionMutationVariables>;
export const DeleteCourseSectionDocument = gql`
    mutation DeleteCourseSection($id: ID!) {
  deleteCourseSection(id: $id) {
    success
    errors {
      message
    }
  }
}
    `;
export type DeleteCourseSectionMutationFn = Apollo.MutationFunction<DeleteCourseSectionMutation, DeleteCourseSectionMutationVariables>;

/**
 * __useDeleteCourseSectionMutation__
 *
 * To run a mutation, you first call `useDeleteCourseSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseSectionMutation, { data, loading, error }] = useDeleteCourseSectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseSectionMutation, DeleteCourseSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseSectionMutation, DeleteCourseSectionMutationVariables>(DeleteCourseSectionDocument, options);
      }
export type DeleteCourseSectionMutationHookResult = ReturnType<typeof useDeleteCourseSectionMutation>;
export type DeleteCourseSectionMutationResult = Apollo.MutationResult<DeleteCourseSectionMutation>;
export type DeleteCourseSectionMutationOptions = Apollo.BaseMutationOptions<DeleteCourseSectionMutation, DeleteCourseSectionMutationVariables>;
export const UpdateCourseSectionRanksDocument = gql`
    mutation UpdateCourseSectionRanks($sectionRanks: [UpdateCourseSectionRankInput!]!) {
  updateCourseSectionRanks(sectionRanks: $sectionRanks) {
    success
    errors {
      message
    }
  }
}
    `;
export type UpdateCourseSectionRanksMutationFn = Apollo.MutationFunction<UpdateCourseSectionRanksMutation, UpdateCourseSectionRanksMutationVariables>;

/**
 * __useUpdateCourseSectionRanksMutation__
 *
 * To run a mutation, you first call `useUpdateCourseSectionRanksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseSectionRanksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseSectionRanksMutation, { data, loading, error }] = useUpdateCourseSectionRanksMutation({
 *   variables: {
 *      sectionRanks: // value for 'sectionRanks'
 *   },
 * });
 */
export function useUpdateCourseSectionRanksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseSectionRanksMutation, UpdateCourseSectionRanksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseSectionRanksMutation, UpdateCourseSectionRanksMutationVariables>(UpdateCourseSectionRanksDocument, options);
      }
export type UpdateCourseSectionRanksMutationHookResult = ReturnType<typeof useUpdateCourseSectionRanksMutation>;
export type UpdateCourseSectionRanksMutationResult = Apollo.MutationResult<UpdateCourseSectionRanksMutation>;
export type UpdateCourseSectionRanksMutationOptions = Apollo.BaseMutationOptions<UpdateCourseSectionRanksMutation, UpdateCourseSectionRanksMutationVariables>;
export const EditableCourseDocument = gql`
    query EditableCourse($id: ID!) {
  editableCourse(id: $id) {
    ...EditableCourse
  }
  languages {
    id
    denomination
    code
  }
  subjects {
    ...Subject
  }
}
    ${EditableCourseFragmentDoc}
${SubjectFragmentDoc}`;

/**
 * __useEditableCourseQuery__
 *
 * To run a query within a React component, call `useEditableCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditableCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditableCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditableCourseQuery(baseOptions: Apollo.QueryHookOptions<EditableCourseQuery, EditableCourseQueryVariables> & ({ variables: EditableCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditableCourseQuery, EditableCourseQueryVariables>(EditableCourseDocument, options);
      }
export function useEditableCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditableCourseQuery, EditableCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditableCourseQuery, EditableCourseQueryVariables>(EditableCourseDocument, options);
        }
export function useEditableCourseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EditableCourseQuery, EditableCourseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EditableCourseQuery, EditableCourseQueryVariables>(EditableCourseDocument, options);
        }
export type EditableCourseQueryHookResult = ReturnType<typeof useEditableCourseQuery>;
export type EditableCourseLazyQueryHookResult = ReturnType<typeof useEditableCourseLazyQuery>;
export type EditableCourseSuspenseQueryHookResult = ReturnType<typeof useEditableCourseSuspenseQuery>;
export type EditableCourseQueryResult = Apollo.QueryResult<EditableCourseQuery, EditableCourseQueryVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($updateCourseInfo: UpdateCourseInfoInput!) {
  updateCourse(updateCourseInfo: $updateCourseInfo) {
    success
    errors {
      message
    }
    course {
      ...EditableCourse
    }
  }
}
    ${EditableCourseFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      updateCourseInfo: // value for 'updateCourseInfo'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id) {
    success
    errors {
      message
    }
  }
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const TeacherCoursesDocument = gql`
    query TeacherCourses {
  teacherCourses {
    ...TeacherCourse
  }
}
    ${TeacherCourseFragmentDoc}`;

/**
 * __useTeacherCoursesQuery__
 *
 * To run a query within a React component, call `useTeacherCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeacherCoursesQuery(baseOptions?: Apollo.QueryHookOptions<TeacherCoursesQuery, TeacherCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeacherCoursesQuery, TeacherCoursesQueryVariables>(TeacherCoursesDocument, options);
      }
export function useTeacherCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeacherCoursesQuery, TeacherCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeacherCoursesQuery, TeacherCoursesQueryVariables>(TeacherCoursesDocument, options);
        }
export function useTeacherCoursesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeacherCoursesQuery, TeacherCoursesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeacherCoursesQuery, TeacherCoursesQueryVariables>(TeacherCoursesDocument, options);
        }
export type TeacherCoursesQueryHookResult = ReturnType<typeof useTeacherCoursesQuery>;
export type TeacherCoursesLazyQueryHookResult = ReturnType<typeof useTeacherCoursesLazyQuery>;
export type TeacherCoursesSuspenseQueryHookResult = ReturnType<typeof useTeacherCoursesSuspenseQuery>;
export type TeacherCoursesQueryResult = Apollo.QueryResult<TeacherCoursesQuery, TeacherCoursesQueryVariables>;
export const ExploreDocument = gql`
    query Explore {
  subjectsListWithLinkedCourses {
    ...ExploreSubject
  }
}
    ${ExploreSubjectFragmentDoc}`;

/**
 * __useExploreQuery__
 *
 * To run a query within a React component, call `useExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreQuery({
 *   variables: {
 *   },
 * });
 */
export function useExploreQuery(baseOptions?: Apollo.QueryHookOptions<ExploreQuery, ExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExploreQuery, ExploreQueryVariables>(ExploreDocument, options);
      }
export function useExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExploreQuery, ExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExploreQuery, ExploreQueryVariables>(ExploreDocument, options);
        }
export function useExploreSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExploreQuery, ExploreQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExploreQuery, ExploreQueryVariables>(ExploreDocument, options);
        }
export type ExploreQueryHookResult = ReturnType<typeof useExploreQuery>;
export type ExploreLazyQueryHookResult = ReturnType<typeof useExploreLazyQuery>;
export type ExploreSuspenseQueryHookResult = ReturnType<typeof useExploreSuspenseQuery>;
export type ExploreQueryResult = Apollo.QueryResult<ExploreQuery, ExploreQueryVariables>;
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
export const SubjectDocument = gql`
    query Subject($id: ID!) {
  subject(id: $id) {
    ...SubjectCourse
  }
}
    ${SubjectCourseFragmentDoc}`;

/**
 * __useSubjectQuery__
 *
 * To run a query within a React component, call `useSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubjectQuery(baseOptions: Apollo.QueryHookOptions<SubjectQuery, SubjectQueryVariables> & ({ variables: SubjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
      }
export function useSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
        }
export function useSubjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
        }
export type SubjectQueryHookResult = ReturnType<typeof useSubjectQuery>;
export type SubjectLazyQueryHookResult = ReturnType<typeof useSubjectLazyQuery>;
export type SubjectSuspenseQueryHookResult = ReturnType<typeof useSubjectSuspenseQuery>;
export type SubjectQueryResult = Apollo.QueryResult<SubjectQuery, SubjectQueryVariables>;