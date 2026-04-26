/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
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
  description?: Maybe<Scalars['JSON']['output']>;
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
  /** Statistics for the current user. */
  statistics?: Maybe<Statistics>;
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
  teacherDescription?: InputMaybe<Scalars['JSON']['input']>;
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
  Video = 'video',
  Youtube = 'youtube'
}

/** A content component which can be of various types. */
export type ContentComponent = TextContent | VideoContent | YouTubeContent;

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

/** Progress tracking for content components */
export type ContentComponentProgress = {
  __typename: 'ContentComponentProgress';
  /** When the component was completed */
  completed_at?: Maybe<Scalars['Date']['output']>;
  /** The content component ID */
  content_component_id: Scalars['Int']['output'];
  /** The unique identifier of the progress record */
  id: Scalars['ID']['output'];
  /** Flag to indicate if the content component is completed */
  is_completed: Scalars['Boolean']['output'];
};

/** Result of updating content component progress */
export type ContentComponentProgressResult = {
  __typename: 'ContentComponentProgressResult';
  /** The updated content component progress. */
  contentComponentProgress?: Maybe<ContentComponentProgress>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
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
  description: Scalars['JSON']['output'];
  /** The end date of the course */
  end_date?: Maybe<Scalars['Date']['output']>;
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

/** Input for creating a course record. */
export type CourseInfoInput = {
  /** The denomination of this course. */
  denomination: Scalars['String']['input'];
  /** The description of this course. */
  description: Scalars['JSON']['input'];
  /** The end date of the course. */
  end_date?: InputMaybe<Scalars['Date']['input']>;
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
  rating?: Maybe<Scalars['Float']['output']>;
  /** The review text given by the reviewer */
  review?: Maybe<Scalars['String']['output']>;
  /** The reviewer who wrote the review */
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

/** Input for creating a course section record. */
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
  /** The slug of the program the course belongs to */
  programSlug?: InputMaybe<Scalars['String']['input']>;
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

/** The result of the creating or updating a program. */
export type CreateOrUpdateProgramResult = {
  __typename: 'CreateOrUpdateProgramResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The created or updated program information. */
  program?: Maybe<Program>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The result of creating a new program version. */
export type CreateProgramVersionResult = {
  __typename: 'CreateProgramVersionResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The newly created draft program version. */
  programVersion?: Maybe<ProgramVersion>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Input for deleting a course rating */
export type DeleteCourseRatingInput = {
  /** The ID of the course. */
  courseId: Scalars['ID']['input'];
  /** The ID of the course rating to delete. */
  courseRateId: Scalars['ID']['input'];
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

/** Input for creating a lesson record. */
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
  /** Creates a program. */
  createProgram?: Maybe<CreateOrUpdateProgramResult>;
  /** Creates a new draft version of a program, copying the course list from the latest published version. */
  createProgramVersion?: Maybe<CreateProgramVersionResult>;
  /** Deletes a content component. */
  deleteContentComponent?: Maybe<MutationResult>;
  /** Deletes a course. */
  deleteCourse?: Maybe<MutationResult>;
  /** Delete a course rating. */
  deleteCourseRating?: Maybe<MutationResult>;
  /** Deletes a course section. */
  deleteCourseSection?: Maybe<MutationResult>;
  /** Deletes a course section item. */
  deleteCourseSectionItem?: Maybe<MutationResult>;
  /** Deletes a lesson. */
  deleteLesson?: Maybe<MutationResult>;
  /** Deletes a program. */
  deleteProgram?: Maybe<MutationResult>;
  /** Enrolls an account in a program. */
  enrollInProgram?: Maybe<UpdateProgramStatusResult>;
  /** Follow or unfollow a teacher. Toggles the follow status. */
  followTeacher?: Maybe<FollowTeacherResult>;
  /** Publishes the current draft version of a program. */
  publishProgramVersion?: Maybe<PublishProgramVersionResult>;
  /** Rate a course. */
  rateCourse?: Maybe<RateCourseResult>;
  /** Remove the profile picture of a user. */
  removeProfilePicture?: Maybe<ChangeProfilePictureResult>;
  /** Unenrolls an account from a program. */
  unenrollFromProgram?: Maybe<UpdateProgramStatusResult>;
  /** Updates a user account information. */
  updateAccountInfo?: Maybe<MutationResult>;
  /** Updates a content component. */
  updateContentComponent?: Maybe<CreateOrUpdateContentComponent>;
  /** Updates the progress of a content component. */
  updateContentComponentProgress?: Maybe<ContentComponentProgressResult>;
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
  /** Updates a program. */
  updateProgram?: Maybe<CreateOrUpdateProgramResult>;
  /** Updates the courses linked to the current draft version of a program. */
  updateProgramVersionCourses?: Maybe<UpdateProgramVersionCoursesResult>;
  /** Upgrades an enrolled student to the latest published version of a program, preserving all existing course enrollment records. */
  upgradeToLatestProgramVersion?: Maybe<UpgradeToLatestProgramVersionResult>;
};


export type MutationChangeProfilePictureArgs = {
  profilePictureDetails: ProfilePictureDetailsInput;
};


export type MutationCreateContentComponentArgs = {
  baseComponentInfo: ContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
  youtubeContent?: InputMaybe<YouTubeContentInput>;
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


export type MutationCreateProgramArgs = {
  programInfo: ProgramInfoInput;
};


export type MutationCreateProgramVersionArgs = {
  programId: Scalars['ID']['input'];
};


export type MutationDeleteContentComponentArgs = {
  componentId: Scalars['ID']['input'];
  componentType: ComponentType;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCourseRatingArgs = {
  ratingInfo: DeleteCourseRatingInput;
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


export type MutationDeleteProgramArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnrollInProgramArgs = {
  programId: Scalars['ID']['input'];
};


export type MutationFollowTeacherArgs = {
  followTeacherInfo: FollowTeacherInput;
};


export type MutationPublishProgramVersionArgs = {
  programId: Scalars['ID']['input'];
};


export type MutationRateCourseArgs = {
  ratingInfo: RateCourse;
};


export type MutationUnenrollFromProgramArgs = {
  programId: Scalars['ID']['input'];
};


export type MutationUpdateAccountInfoArgs = {
  accountInfo: AccountInfoInput;
};


export type MutationUpdateContentComponentArgs = {
  baseComponentInfo: UpdateContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
  youtubeContent?: InputMaybe<YouTubeContentInput>;
};


export type MutationUpdateContentComponentProgressArgs = {
  progressInput: UpdateContentComponentProgressInput;
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


export type MutationUpdateProgramArgs = {
  updateProgramInfo: UpdateProgramInfoInput;
};


export type MutationUpdateProgramVersionCoursesArgs = {
  updateProgramVersionCoursesInfo: UpdateProgramVersionCoursesInput;
};


export type MutationUpgradeToLatestProgramVersionArgs = {
  programId: Scalars['ID']['input'];
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
  teacherDescription?: InputMaybe<Scalars['JSON']['input']>;
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

/** The program info. */
export type Program = {
  __typename: 'Program';
  /** The date of when this program was created. */
  created_at: Scalars['Date']['output'];
  /** The relevant program version for the current user. Returns the draft version for the owning teacher, the enrolled version for an enrolled student, and the latest published version for everyone else. */
  currentVersion: ProgramVersion;
  /** The denomination of this program. */
  denomination: Scalars['String']['output'];
  /** The description of this program. */
  description: Scalars['JSON']['output'];
  /** The version the owning teacher should edit. Returns the current draft if one exists, otherwise the latest published version. */
  editableVersion: ProgramVersion;
  /** Number of learners currently enrolled in this program. */
  enrolledLearnersCount: Scalars['Int']['output'];
  /** A unique id of this program. */
  id: Scalars['ID']['output'];
  /** The image of this program. */
  image?: Maybe<Scalars['String']['output']>;
  /** The instructor of this program. */
  instructor: Teacher;
  /** A flag to indicate whether this program is published or not. */
  is_published: Scalars['Boolean']['output'];
  /** The latest program version number. */
  latestVersionNumber?: Maybe<Scalars['Int']['output']>;
  /** The difficulty level of this program. */
  level: ProgramLevel;
  /** The objectives of this program. */
  objectives: Array<ProgramObjective>;
  /** The requirements of this program. */
  requirements: Array<ProgramRequirement>;
  /** A unique slug of this program. */
  slug: Scalars['String']['output'];
  /** The status of the program for the current user. */
  status: ProgramStatus;
  /** The subjects linked to this program. */
  subjects: Array<Subject>;
  /** The subtitle of this program. */
  subtitle: Scalars['String']['output'];
  /** The date of when this program was last updated. */
  updated_at: Scalars['Date']['output'];
};

/** Input for creating a program record. */
export type ProgramInfoInput = {
  /** The denomination of this program. */
  denomination: Scalars['String']['input'];
  /** The description of this program. */
  description: Scalars['JSON']['input'];
  /** The image of this program. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** A flag to indicate whether this program is published or not. */
  is_published: Scalars['Boolean']['input'];
  /** The difficulty level of this program. */
  level: ProgramLevel;
  /** List of objectives for the program */
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  /** List of requirements for the program */
  requirements?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The slug of this program. */
  slug: Scalars['String']['input'];
  /** List of subject IDs to associate with the program */
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The subtitle of this program. */
  subtitle: Scalars['String']['input'];
};

/** The difficulty level of a program. */
export enum ProgramLevel {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Intermediate = 'intermediate'
}

/** The program objective info */
export type ProgramObjective = {
  __typename: 'ProgramObjective';
  /** A unique id of this program objective. */
  id: Scalars['ID']['output'];
  /** The objective of this program. */
  objective: Scalars['String']['output'];
};

/** Input for a program objective record. */
export type ProgramObjectiveInput = {
  /** A unique id of this program objective. */
  id: Scalars['ID']['input'];
  /** The objective of this program. */
  objective: Scalars['String']['input'];
};

/** The program requirement info */
export type ProgramRequirement = {
  __typename: 'ProgramRequirement';
  /** A unique id of this program requirement. */
  id: Scalars['ID']['output'];
  /** The requirement of this program. */
  requirement: Scalars['String']['output'];
};

/** Input for a program requirement record. */
export type ProgramRequirementInput = {
  /** A unique id of this program requirement. */
  id: Scalars['ID']['input'];
  /** The requirement of this program. */
  requirement: Scalars['String']['input'];
};

/** The status of the program for the current user. */
export enum ProgramStatus {
  /** This program has been completed by the user. */
  Completed = 'completed',
  /** The user is currently in progress in this program. */
  InProgress = 'in_progress',
  /** This program is not started yet. */
  NotStarted = 'not_started'
}

/** A versioned snapshot of a program's course list. */
export type ProgramVersion = {
  __typename: 'ProgramVersion';
  /** The ordered list of course entries in this program version, including rank and prerequisite metadata. */
  courseEntries: Array<ProgramVersionCourseEntry>;
  /** The ordered list of courses in this program version. */
  courses: Array<Course>;
  /** The date this program version was created. */
  created_at: Scalars['Date']['output'];
  /** A unique id of this program version. */
  id: Scalars['ID']['output'];
  /** The ID of the program this version belongs to. */
  program_id: Scalars['ID']['output'];
  /** The date this version was published. Null if not yet published. */
  published_at?: Maybe<Scalars['Date']['output']>;
  /** The lifecycle status of this program version. */
  status: ProgramVersionStatus;
  /** The date this program version was last updated. */
  updated_at: Scalars['Date']['output'];
  /** The sequential version number of this program version. */
  version_number: Scalars['Int']['output'];
};

/** A course entry within a program version, including its rank and prerequisite course. */
export type ProgramVersionCourseEntry = {
  __typename: 'ProgramVersionCourseEntry';
  /** The course in this program version. */
  course: Course;
  /** The ID of the course that must be completed before this one. Null means no prerequisite. */
  prerequisiteCourseId?: Maybe<Scalars['ID']['output']>;
  /** The position of this course within the program version. */
  rank: Scalars['Int']['output'];
};

/** Input for a single course entry in a program version. */
export type ProgramVersionCourseInput = {
  /** The ID of the course to link to the program version. */
  courseId: Scalars['ID']['input'];
  /** The ID of the course that must be completed before this one. Null means no prerequisite. */
  prerequisiteCourseId?: InputMaybe<Scalars['ID']['input']>;
  /** The position of this course within the program version. */
  rank: Scalars['Int']['input'];
};

/** The lifecycle status of a program version. */
export enum ProgramVersionStatus {
  Archived = 'archived',
  Draft = 'draft',
  Published = 'published'
}

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

/** The result of publishing a program version. */
export type PublishProgramVersionResult = {
  __typename: 'PublishProgramVersionResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The newly published program version. */
  programVersion?: Maybe<ProgramVersion>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename: 'Query';
  /** List of courses the user has completed. */
  completedCourses: Array<Course>;
  /** List of countries */
  countries: Array<Country>;
  /** Retrieve a course by its slug */
  course?: Maybe<Course>;
  /** Retrieve a course to be edited by the teacher. */
  editableCourse?: Maybe<Course>;
  /** Retrieve a program to be edited by the teacher. */
  editableProgram?: Maybe<Program>;
  /** List of courses the user is enrolled in */
  enrolledCourses: Array<Course>;
  /** Retrieve the instructor (teacher) account by its id */
  instructor?: Maybe<Teacher>;
  /** List of languages */
  languages: Array<Language>;
  /** The current user */
  me: Account;
  /** List of OpenId clients */
  openIdClients: Array<OpenidClient>;
  /** Retrieve a program by its slug */
  program?: Maybe<Program>;
  /** Retrieve a subject by its id */
  subject?: Maybe<Subject>;
  /** List of subjects */
  subjects: Array<Subject>;
  /** List of subjects that have content associated with them */
  subjectsWithLinkedContent: Array<Subject>;
  /** List of courses created by the teacher */
  teacherCourses: Array<Course>;
  /** List of programs created by the teacher */
  teacherPrograms: Array<Program>;
};


export type QueryCourseArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEditableCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEditableProgramArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInstructorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProgramArgs = {
  slug: Scalars['String']['input'];
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

/** The result of the rateCourse mutation. */
export type RateCourseResult = {
  __typename: 'RateCourseResult';
  /** The updated course information. */
  course?: Maybe<Course>;
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Statistics info for the current user. */
export type Statistics = {
  __typename: 'Statistics';
  /** The number of completed courses by the user */
  completedCoursesCount: Scalars['Int']['output'];
  /** The number of enrolled courses by the user */
  enrolledCoursesCount: Scalars['Int']['output'];
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
  /** The programs linked to this subject. */
  programs: Array<Program>;
};

/** The properties of a teacher account */
export type Teacher = {
  __typename: 'Teacher';
  /** The avatar url of this teacher */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** A short biography of the teacher */
  bio?: Maybe<Scalars['String']['output']>;
  /** List of courses created by the teacher */
  courses: Array<Course>;
  /** A detailed description of the teacher */
  description?: Maybe<Scalars['JSON']['output']>;
  /** The first name of the teacher */
  first_name?: Maybe<Scalars['String']['output']>;
  /** The number of followers this teacher has */
  followersCount: Scalars['Int']['output'];
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
  /** List of programs created by the teacher */
  programs: Array<Program>;
};

/** A text content component. */
export type TextContent = {
  __typename: 'TextContent';
  /** The id of the component this text content belongs to. */
  component_id: Scalars['ID']['output'];
  /** The text content. */
  content: Scalars['JSON']['output'];
  /** The denomination of the component. */
  denomination: Scalars['String']['output'];
  /** A unique id of this text content component. */
  id: Scalars['ID']['output'];
  /** A flag indicating whether the component is published */
  is_published: Scalars['Boolean']['output'];
  /** A flag indicating whether the component is required to continue. */
  is_required: Scalars['Boolean']['output'];
  /** The progress of this component for the current user */
  progress?: Maybe<ContentComponentProgress>;
  /** The rank of the component */
  rank: Scalars['Int']['output'];
  /** The type of the component. */
  type: ComponentType;
};

export type TextContentInput = {
  /** The text content. */
  content: Scalars['JSON']['input'];
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

/** Input for updating content component progress */
export type UpdateContentComponentProgressInput = {
  /** The content component ID */
  contentComponentId: Scalars['String']['input'];
  /** Flag to indicate if the content component is completed */
  isCompleted: Scalars['Boolean']['input'];
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
  description?: InputMaybe<Scalars['JSON']['input']>;
  /** The end date of the course */
  end_date?: InputMaybe<Scalars['Date']['input']>;
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

/** Input for updating a program record. */
export type UpdateProgramInfoInput = {
  /** The denomination of this program */
  denomination?: InputMaybe<Scalars['String']['input']>;
  /** The description of this program */
  description?: InputMaybe<Scalars['JSON']['input']>;
  /** The ID of this program */
  id: Scalars['ID']['input'];
  /** The image of this program */
  image?: InputMaybe<Scalars['String']['input']>;
  /** A flag to indicate whether this program is published or not */
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  /** The difficulty level of this program */
  level?: InputMaybe<ProgramLevel>;
  /** List of objectives for the program */
  objectives?: InputMaybe<Array<ProgramObjectiveInput>>;
  /** List of requirements for the program */
  requirements?: InputMaybe<Array<ProgramRequirementInput>>;
  /** The slug of this program */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** List of subject IDs to associate with the program */
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The subtitle of this program */
  subtitle?: InputMaybe<Scalars['String']['input']>;
};

/** The result of the enrolling or unenrolling from a program. */
export type UpdateProgramStatusResult = {
  __typename: 'UpdateProgramStatusResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The updated course information. */
  program?: Maybe<Program>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Input for updating the courses linked to the current draft version of a program. */
export type UpdateProgramVersionCoursesInput = {
  /** The full ordered list of courses for this version. This is a full replace — existing links are deleted and re-inserted. */
  courses: Array<ProgramVersionCourseInput>;
  /** The ID of the program whose draft version will be updated. */
  programId: Scalars['ID']['input'];
};

/** The result of updating the courses in a program version. */
export type UpdateProgramVersionCoursesResult = {
  __typename: 'UpdateProgramVersionCoursesResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The updated program version. */
  programVersion?: Maybe<ProgramVersion>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** The result of upgrading a student to the latest published program version. */
export type UpgradeToLatestProgramVersionResult = {
  __typename: 'UpgradeToLatestProgramVersionResult';
  /** A list of errors that occurred executing this mutation. */
  errors: Array<Error>;
  /** The program after the version upgrade. */
  program?: Maybe<Program>;
  /** Indicates if the mutation was successful. */
  success: Scalars['Boolean']['output'];
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
  /** The progress of this component for the current user */
  progress?: Maybe<ContentComponentProgress>;
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

/** A YouTube content component. */
export type YouTubeContent = {
  __typename: 'YouTubeContent';
  /** The id of the component this video content belongs to. */
  component_id: Scalars['ID']['output'];
  /** The denomination of the component. */
  denomination: Scalars['String']['output'];
  /** The description of the YouTube. */
  description?: Maybe<Scalars['JSON']['output']>;
  /** A unique id of this video content component. */
  id: Scalars['ID']['output'];
  /** A flag indicating whether the component is published */
  is_published: Scalars['Boolean']['output'];
  /** A flag indicating whether the component is required to continue. */
  is_required: Scalars['Boolean']['output'];
  /** The progress of this component for the current user */
  progress?: Maybe<ContentComponentProgress>;
  /** The rank of the component */
  rank: Scalars['Int']['output'];
  /** The type of the component. */
  type: ComponentType;
  /** The YouTube video id. */
  youtube_video_id: Scalars['String']['output'];
};

export type YouTubeContentInput = {
  /** The description of the YouTube. */
  description?: InputMaybe<Scalars['JSON']['input']>;
  /** The video ID of the YouTube video. */
  videoId: Scalars['String']['input'];
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

export type AccountFragment = { __typename: 'Account', id: string, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: any | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me: { __typename: 'Account', id: string, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, preferredLanguage: string, accountRole: AccountRole, bio?: string | null, description?: any | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> } };

export type TextContentComponentFragment = { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null };

export type VideoContentComponentFragment = { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null };

export type YouTubeContentComponentFragment = { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, youtube_video_id: string, description?: any | null, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null };

export type CourseSectionFragment = { __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
      | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
      | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
      | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, youtube_video_id: string, description?: any | null, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
    > }> };

export type CourseReviewFragment = { __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } };

export type CourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: any, level: CourseLevel, image?: string | null, external_resource_link?: string | null, start_date?: any | null, end_date?: any | null, language: string, updated_at: any, created_at: any, status: CourseStatus, rating: number, ratingsCount: number, participationCount: number, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }>, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
        | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
        | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
        | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, youtube_video_id: string, description?: any | null, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
      > }> }>, reviews: Array<{ __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, viewerReview?: { __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } } | null, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, isFollowed: boolean, isAllowedToFollow: boolean } };

export type CourseQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CourseQuery = { __typename: 'Query', course?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: any, level: CourseLevel, image?: string | null, external_resource_link?: string | null, start_date?: any | null, end_date?: any | null, language: string, updated_at: any, created_at: any, status: CourseStatus, rating: number, ratingsCount: number, participationCount: number, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }>, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, is_published: boolean, rank: number, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
          | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
          | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
          | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, youtube_video_id: string, description?: any | null, component_id: string, progress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null }
        > }> }>, reviews: Array<{ __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, viewerReview?: { __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } } | null, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, isFollowed: boolean, isAllowedToFollow: boolean } } | null };

export type UpdateCourseStatusMutationVariables = Exact<{
  courseStatusInput: CourseStatusInput;
}>;


export type UpdateCourseStatusMutation = { __typename: 'Mutation', updateCourseStatus?: { __typename: 'UpdateCourseStatusResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, status: CourseStatus } | null } | null };

export type RateCourseMutationVariables = Exact<{
  ratingInfo: RateCourse;
}>;


export type RateCourseMutation = { __typename: 'Mutation', rateCourse?: { __typename: 'RateCourseResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', rating: number, reviews: Array<{ __typename: 'CourseReview', id: string, rating?: number | null, review?: string | null, created_at: any, isEditable: boolean, reviewer: { __typename: 'PublicAccount', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> } | null } | null };

export type DeleteCourseRatingMutationVariables = Exact<{
  ratingInfo: DeleteCourseRatingInput;
}>;


export type DeleteCourseRatingMutation = { __typename: 'Mutation', deleteCourseRating?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type FollowTeacherMutationVariables = Exact<{
  followTeacherInfo: FollowTeacherInput;
}>;


export type FollowTeacherMutation = { __typename: 'Mutation', followTeacher?: { __typename: 'FollowTeacherResult', success: boolean, isFollowing?: boolean | null, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type UpdateContentComponentProgressMutationVariables = Exact<{
  progressInput: UpdateContentComponentProgressInput;
}>;


export type UpdateContentComponentProgressMutation = { __typename: 'Mutation', updateContentComponentProgress?: { __typename: 'ContentComponentProgressResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, contentComponentProgress?: { __typename: 'ContentComponentProgress', id: string, content_component_id: number, is_completed: boolean } | null } | null };

export type LanguageFragment = { __typename: 'Language', id: string, denomination: string, code: string };

export type CreateCoursePageQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateCoursePageQuery = { __typename: 'Query', languages: Array<{ __typename: 'Language', id: string, denomination: string, code: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type CreateCourseMutationVariables = Exact<{
  courseInfo: CourseInfoInput;
}>;


export type CreateCourseMutation = { __typename: 'Mutation', createCourse?: { __typename: 'CreateOrUpdateCourseResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, slug: string } | null } | null };

export type EditableTextContentComponentFragment = { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string };

export type EditableVideoContentComponentFragment = { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string };

export type EditableYouTubeContentComponentFragment = { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null };

export type EditableLessonFragment = { __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
    | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
    | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
    | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
  > };

export type SectionFragment = { __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
      | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
      | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
      | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
    > }> };

export type EditableCourseSectionItemFragment = { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
        | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
        | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
        | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
      > }> }> };

export type EditableCourseSectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableCourseSectionQuery = { __typename: 'Query', editableCourse?: { __typename: 'Course', id: string, sections: Array<{ __typename: 'CourseSection', id: string, denomination: string, items: Array<{ __typename: 'Lesson', id: string, itemId: string, denomination: string, duration: number, is_published: boolean, components: Array<
          | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
          | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
          | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
        > }> }> } | null };

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
  youtubeContent?: InputMaybe<YouTubeContentInput>;
}>;


export type CreateContentComponentMutation = { __typename: 'Mutation', createContentComponent?: { __typename: 'CreateOrUpdateContentComponent', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, component?:
      | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
      | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
      | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
     | null } | null };

export type UpdateContentComponentMutationVariables = Exact<{
  baseComponentInfo: UpdateContentComponentBaseInput;
  textContent?: InputMaybe<TextContentInput>;
  videoContent?: InputMaybe<VideoContentInput>;
  youtubeContent?: InputMaybe<YouTubeContentInput>;
}>;


export type UpdateContentComponentMutation = { __typename: 'Mutation', updateContentComponent?: { __typename: 'CreateOrUpdateContentComponent', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, component?:
      | { __typename: 'TextContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, content: any, component_id: string }
      | { __typename: 'VideoContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, url: string, component_id: string }
      | { __typename: 'YouTubeContent', id: string, type: ComponentType, denomination: string, is_published: boolean, is_required: boolean, component_id: string, youtube_video_id: string, description?: any | null }
     | null } | null };

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

export type EditableCourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: any, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> };

export type EditableCourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableCourseQuery = { __typename: 'Query', editableCourse?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: any, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> } | null, languages: Array<{ __typename: 'Language', id: string, denomination: string, code: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateCourseMutationVariables = Exact<{
  updateCourseInfo: UpdateCourseInfoInput;
}>;


export type UpdateCourseMutation = { __typename: 'Mutation', updateCourse?: { __typename: 'CreateOrUpdateCourseResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, course?: { __typename: 'Course', id: string, denomination: string, slug: string, subtitle: string, description: any, level: CourseLevel, image?: string | null, language: string, external_resource_link?: string | null, is_published: boolean, start_date?: any | null, end_date?: any | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'CourseObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'CourseRequirement', id: string, requirement: string }> } | null } | null };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourseMutation = { __typename: 'Mutation', deleteCourse?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type TeacherCourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, is_published: boolean, created_at: any, updated_at: any };

export type TeacherCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherCoursesQuery = { __typename: 'Query', teacherCourses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, is_published: boolean, created_at: any, updated_at: any }> };

export type CreateProgramPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateProgramPageQuery = { __typename: 'Query', subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type CreateProgramMutationVariables = Exact<{
  programInfo: ProgramInfoInput;
}>;


export type CreateProgramMutation = { __typename: 'Mutation', createProgram?: { __typename: 'CreateOrUpdateProgramResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, program?: { __typename: 'Program', id: string, slug: string } | null } | null };

export type ProgramCourseFragment = { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any };

export type ProgramVersionCourseEntryFragment = { __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } };

export type ProgramVersionFragment = { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> };

export type EditableProgramFragment = { __typename: 'Program', id: string, denomination: string, slug: string, subtitle: string, description: any, level: ProgramLevel, image?: string | null, is_published: boolean, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'ProgramObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'ProgramRequirement', id: string, requirement: string }>, editableVersion: { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } };

export type EditableProgramQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EditableProgramQuery = { __typename: 'Query', editableProgram?: { __typename: 'Program', id: string, denomination: string, slug: string, subtitle: string, description: any, level: ProgramLevel, image?: string | null, is_published: boolean, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'ProgramObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'ProgramRequirement', id: string, requirement: string }>, editableVersion: { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } } | null, teacherCourses: Array<{ __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateProgramMutationVariables = Exact<{
  updateProgramInfo: UpdateProgramInfoInput;
}>;


export type UpdateProgramMutation = { __typename: 'Mutation', updateProgram?: { __typename: 'CreateOrUpdateProgramResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, program?: { __typename: 'Program', id: string, denomination: string, slug: string, subtitle: string, description: any, level: ProgramLevel, image?: string | null, is_published: boolean, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'ProgramObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'ProgramRequirement', id: string, requirement: string }>, editableVersion: { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } } | null } | null };

export type DeleteProgramMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProgramMutation = { __typename: 'Mutation', deleteProgram?: { __typename: 'MutationResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }> } | null };

export type UpdateProgramVersionCoursesMutationVariables = Exact<{
  updateProgramVersionCoursesInfo: UpdateProgramVersionCoursesInput;
}>;


export type UpdateProgramVersionCoursesMutation = { __typename: 'Mutation', updateProgramVersionCourses?: { __typename: 'UpdateProgramVersionCoursesResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, programVersion?: { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } | null } | null };

export type PublishProgramVersionMutationVariables = Exact<{
  programId: Scalars['ID']['input'];
}>;


export type PublishProgramVersionMutation = { __typename: 'Mutation', publishProgramVersion?: { __typename: 'PublishProgramVersionResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, programVersion?: { __typename: 'ProgramVersion', published_at?: any | null, id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } | null } | null };

export type CreateProgramVersionMutationVariables = Exact<{
  programId: Scalars['ID']['input'];
}>;


export type CreateProgramVersionMutation = { __typename: 'Mutation', createProgramVersion?: { __typename: 'CreateProgramVersionResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, programVersion?: { __typename: 'ProgramVersion', id: string, status: ProgramVersionStatus, version_number: number, courseEntries: Array<{ __typename: 'ProgramVersionCourseEntry', rank: number, prerequisiteCourseId?: string | null, course: { __typename: 'Course', id: string, denomination: string, image?: string | null, slug: string, level: CourseLevel, updated_at: any } }> } | null } | null };

export type TeacherProgramFragment = { __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, is_published: boolean, created_at: any, updated_at: any };

export type TeacherProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherProgramsQuery = { __typename: 'Query', teacherPrograms: Array<{ __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, is_published: boolean, created_at: any, updated_at: any }> };

export type InstructorFragment = { __typename: 'Teacher', first_name?: string | null, followersCount: number, courses: Array<{ __typename: 'Course', id: string }>, programs: Array<{ __typename: 'Program', id: string }> };

export type DashboardQueryVariables = Exact<{
  instructorId: Scalars['ID']['input'];
}>;


export type DashboardQuery = { __typename: 'Query', instructor?: { __typename: 'Teacher', first_name?: string | null, followersCount: number, courses: Array<{ __typename: 'Course', id: string }>, programs: Array<{ __typename: 'Program', id: string }> } | null };

export type ExploreSubjectFragment = { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, participationCount: number }>, programs: Array<{ __typename: 'Program', id: string, enrolledLearnersCount: number }> };

export type ExploreQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreQuery = { __typename: 'Query', subjectsWithLinkedContent: Array<{ __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, participationCount: number }>, programs: Array<{ __typename: 'Program', id: string, enrolledLearnersCount: number }> }> };

export type HomeCourseFragment = { __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } };

export type StatisticsFragment = { __typename: 'Statistics', enrolledCoursesCount: number, completedCoursesCount: number };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename: 'Query', enrolledCourses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, completedCourses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, me: { __typename: 'Account', id: string, statistics?: { __typename: 'Statistics', enrolledCoursesCount: number, completedCoursesCount: number } | null } };

export type TeacherFragment = { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, bio?: string | null, isFollowed: boolean, isAllowedToFollow: boolean, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number }>, programs: Array<{ __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, image?: string | null, enrolledLearnersCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null }, currentVersion: { __typename: 'ProgramVersion', courses: Array<{ __typename: 'Course', id: string }> } }> };

export type InstructorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type InstructorQuery = { __typename: 'Query', instructor?: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, bio?: string | null, isFollowed: boolean, isAllowedToFollow: boolean, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number }>, programs: Array<{ __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, image?: string | null, enrolledLearnersCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null }, currentVersion: { __typename: 'ProgramVersion', courses: Array<{ __typename: 'Course', id: string }> } }> } | null };

export type UserFragment = { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: any | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename: 'Query', me: { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: any | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> }, countries: Array<{ __typename: 'Country', id: string, denomination: string }>, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> };

export type UpdateProfileMutationVariables = Exact<{
  profileDetails: ProfileDetailsInput;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile?: { __typename: 'UpdateProfileResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, name?: string | null, nickname?: string | null, first_name?: string | null, last_name?: string | null, gender?: Gender | null, date_of_birth?: any | null, avatar_url?: string | null, accountRole: AccountRole, preferredLanguage: string, bio?: string | null, description?: any | null, country?: { __typename: 'Country', id: string, denomination: string } | null, nationality?: { __typename: 'Country', id: string, denomination: string } | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }> } | null } | null };

export type ChangeProfilePictureMutationVariables = Exact<{
  profilePictureDetails: ProfilePictureDetailsInput;
}>;


export type ChangeProfilePictureMutation = { __typename: 'Mutation', changeProfilePicture?: { __typename: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, avatar_url?: string | null } | null } | null };

export type RemoveProfilePictureMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfilePictureMutation = { __typename: 'Mutation', removeProfilePicture?: { __typename: 'ChangeProfilePictureResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, user?: { __typename: 'Account', id: string, avatar_url?: string | null } | null } | null };

export type ProgramFragment = { __typename: 'Program', id: string, denomination: string, slug: string, subtitle: string, description: any, level: ProgramLevel, image?: string | null, updated_at: any, created_at: any, status: ProgramStatus, enrolledLearnersCount: number, latestVersionNumber?: number | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'ProgramObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'ProgramRequirement', id: string, requirement: string }>, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, isFollowed: boolean, isAllowedToFollow: boolean }, currentVersion: { __typename: 'ProgramVersion', id: string, version_number: number, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, status: CourseStatus, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> } };

export type ProgramQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProgramQuery = { __typename: 'Query', program?: { __typename: 'Program', id: string, denomination: string, slug: string, subtitle: string, description: any, level: ProgramLevel, image?: string | null, updated_at: any, created_at: any, status: ProgramStatus, enrolledLearnersCount: number, latestVersionNumber?: number | null, subjects: Array<{ __typename: 'Subject', id: string, denomination: string }>, objectives: Array<{ __typename: 'ProgramObjective', id: string, objective: string }>, requirements: Array<{ __typename: 'ProgramRequirement', id: string, requirement: string }>, instructor: { __typename: 'Teacher', id: string, first_name?: string | null, last_name?: string | null, avatar_url?: string | null, description?: any | null, isFollowed: boolean, isAllowedToFollow: boolean }, currentVersion: { __typename: 'ProgramVersion', id: string, version_number: number, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, status: CourseStatus, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> } } | null };

export type EnrollInProgramMutationVariables = Exact<{
  programId: Scalars['ID']['input'];
}>;


export type EnrollInProgramMutation = { __typename: 'Mutation', enrollInProgram?: { __typename: 'UpdateProgramStatusResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, program?: { __typename: 'Program', id: string, status: ProgramStatus, latestVersionNumber?: number | null } | null } | null };

export type UnenrollFromProgramMutationVariables = Exact<{
  programId: Scalars['ID']['input'];
}>;


export type UnenrollFromProgramMutation = { __typename: 'Mutation', unenrollFromProgram?: { __typename: 'UpdateProgramStatusResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, program?: { __typename: 'Program', id: string, status: ProgramStatus, latestVersionNumber?: number | null } | null } | null };

export type UpgradeToLatestProgramVersionMutationVariables = Exact<{
  programId: Scalars['ID']['input'];
}>;


export type UpgradeToLatestProgramVersionMutation = { __typename: 'Mutation', upgradeToLatestProgramVersion?: { __typename: 'UpgradeToLatestProgramVersionResult', success: boolean, errors: Array<{ __typename: 'Error', message: string }>, program?: { __typename: 'Program', id: string, status: ProgramStatus, latestVersionNumber?: number | null, currentVersion: { __typename: 'ProgramVersion', id: string, version_number: number, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, status: CourseStatus, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }> } } | null } | null };

export type SubjectContentFragment = { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, programs: Array<{ __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, image?: string | null, enrolledLearnersCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null }, currentVersion: { __typename: 'ProgramVersion', courses: Array<{ __typename: 'Course', id: string }> } }> };

export type SubjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SubjectQuery = { __typename: 'Query', subject?: { __typename: 'Subject', id: string, denomination: string, courses: Array<{ __typename: 'Course', id: string, denomination: string, slug: string, level: CourseLevel, image?: string | null, rating: number, participationCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null } }>, programs: Array<{ __typename: 'Program', id: string, denomination: string, slug: string, level: ProgramLevel, image?: string | null, enrolledLearnersCount: number, instructor: { __typename: 'Teacher', first_name?: string | null, last_name?: string | null, avatar_url?: string | null }, currentVersion: { __typename: 'ProgramVersion', courses: Array<{ __typename: 'Course', id: string }> } }> } | null };

export const OpenidClientFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpenidClient"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpenidClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"button_text"}},{"kind":"Field","name":{"kind":"Name","value":"button_icon"}},{"kind":"Field","name":{"kind":"Name","value":"button_background_color"}},{"kind":"Field","name":{"kind":"Name","value":"identity_provider"}}]}}]} as unknown as DocumentNode<OpenidClientFragment, unknown>;
export const CountryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Country"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]} as unknown as DocumentNode<CountryFragment, unknown>;
export const AccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<AccountFragment, unknown>;
export const TextContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]} as unknown as DocumentNode<TextContentComponentFragment, unknown>;
export const VideoContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]} as unknown as DocumentNode<VideoContentComponentFragment, unknown>;
export const YouTubeContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]} as unknown as DocumentNode<YouTubeContentComponentFragment, unknown>;
export const CourseSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"YouTubeContentComponent"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]} as unknown as DocumentNode<CourseSectionFragment, unknown>;
export const CourseReviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEditable"}}]}}]} as unknown as DocumentNode<CourseReviewFragment, unknown>;
export const CourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Course"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"external_resource_link"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseSection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseReview"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewerReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseReview"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"YouTubeContentComponent"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEditable"}}]}}]} as unknown as DocumentNode<CourseFragment, unknown>;
export const LanguageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Language"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]} as unknown as DocumentNode<LanguageFragment, unknown>;
export const EditableTextContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}}]} as unknown as DocumentNode<EditableTextContentComponentFragment, unknown>;
export const EditableVideoContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}}]} as unknown as DocumentNode<EditableVideoContentComponentFragment, unknown>;
export const EditableYouTubeContentComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<EditableYouTubeContentComponentFragment, unknown>;
export const EditableLessonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableLesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<EditableLessonFragment, unknown>;
export const SectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Section"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableLesson"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableLesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}}]} as unknown as DocumentNode<SectionFragment, unknown>;
export const EditableCourseSectionItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourseSectionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Section"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableLesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Section"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableLesson"}}]}}]}}]}}]} as unknown as DocumentNode<EditableCourseSectionItemFragment, unknown>;
export const EditableCourseSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourseSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]} as unknown as DocumentNode<EditableCourseSectionFragment, unknown>;
export const EditableCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"external_resource_link"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}}]}}]} as unknown as DocumentNode<EditableCourseFragment, unknown>;
export const TeacherCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TeacherCourseFragment, unknown>;
export const SubjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]} as unknown as DocumentNode<SubjectFragment, unknown>;
export const ProgramCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<ProgramCourseFragment, unknown>;
export const ProgramVersionCourseEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<ProgramVersionCourseEntryFragment, unknown>;
export const ProgramVersionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}}]} as unknown as DocumentNode<ProgramVersionFragment, unknown>;
export const EditableProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editableVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}}]} as unknown as DocumentNode<EditableProgramFragment, unknown>;
export const TeacherProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TeacherProgramFragment, unknown>;
export const InstructorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Instructor"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InstructorFragment, unknown>;
export const ExploreSubjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExploreSubject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}}]}}]}}]} as unknown as DocumentNode<ExploreSubjectFragment, unknown>;
export const HomeCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomeCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<HomeCourseFragment, unknown>;
export const StatisticsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Statistics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Statistics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrolledCoursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCoursesCount"}}]}}]} as unknown as DocumentNode<StatisticsFragment, unknown>;
export const TeacherFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Teacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeacherFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const ProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Program"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestVersionNumber"}}]}}]} as unknown as DocumentNode<ProgramFragment, unknown>;
export const SubjectContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubjectContent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SubjectContentFragment, unknown>;
export const OpenIdClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenIdClient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openIdClients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OpenidClient"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpenidClient"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpenidClient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"button_text"}},{"kind":"Field","name":{"kind":"Name","value":"button_icon"}},{"kind":"Field","name":{"kind":"Name","value":"button_background_color"}},{"kind":"Field","name":{"kind":"Name","value":"identity_provider"}}]}}]} as unknown as DocumentNode<OpenIdClientQuery, OpenIdClientQueryVariables>;
export const SetupProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SetupProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Country"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]} as unknown as DocumentNode<SetupProfileQuery, SetupProfileQueryVariables>;
export const UpdateAccountInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccountInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAccountInfoMutation, UpdateAccountInfoMutationVariables>;
export const AccountInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}}]}}]}}]} as unknown as DocumentNode<AccountInfoQuery, AccountInfoQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Account"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Account"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Course"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Course"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"YouTubeContentComponent"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEditable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Course"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"external_resource_link"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseSection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseReview"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewerReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseReview"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}}]} as unknown as DocumentNode<CourseQuery, CourseQueryVariables>;
export const UpdateCourseStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourseStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourseStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseStatusMutation, UpdateCourseStatusMutationVariables>;
export const RateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratingInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RateCourse"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ratingInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratingInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseReview"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isEditable"}}]}}]} as unknown as DocumentNode<RateCourseMutation, RateCourseMutationVariables>;
export const DeleteCourseRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourseRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratingInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCourseRatingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCourseRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ratingInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratingInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCourseRatingMutation, DeleteCourseRatingMutationVariables>;
export const FollowTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followTeacherInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followTeacherInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followTeacherInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]} as unknown as DocumentNode<FollowTeacherMutation, FollowTeacherMutationVariables>;
export const UpdateContentComponentProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContentComponentProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"progressInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContentComponentProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContentComponentProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"progressInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"progressInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentComponentProgress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content_component_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateContentComponentProgressMutation, UpdateContentComponentProgressMutationVariables>;
export const CreateCoursePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateCoursePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Language"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Language"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]} as unknown as DocumentNode<CreateCoursePageQuery, CreateCoursePageQueryVariables>;
export const CreateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCourseMutation, CreateCourseMutationVariables>;
export const EditableCourseSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditableCourseSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editableCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableCourseSectionItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableLesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Section"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableLesson"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourseSectionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Section"}}]}}]}}]} as unknown as DocumentNode<EditableCourseSectionQuery, EditableCourseSectionQueryVariables>;
export const CreateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLessonInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const DeleteCourseSectionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourseSectionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCourseSectionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCourseSectionItemMutation, DeleteCourseSectionItemMutationVariables>;
export const UpdateCourseSectionItemRanksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourseSectionItemRanks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sectionItemRanks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCourseSectionItemRankInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourseSectionItemRanks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sectionItemRanks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sectionItemRanks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseSectionItemRanksMutation, UpdateCourseSectionItemRanksMutationVariables>;
export const DeleteContentComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteContentComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteContentComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"componentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteContentComponentMutation, DeleteContentComponentMutationVariables>;
export const UpdateContentComponentRanksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContentComponentRanks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentRanks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContentComponentRankInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContentComponentRanks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentRanks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentRanks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateContentComponentRanksMutation, UpdateContentComponentRanksMutationVariables>;
export const CreateContentComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContentComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"baseComponentInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentComponentBaseInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"textContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TextContentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"youtubeContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContentComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"baseComponentInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"baseComponentInfo"}}},{"kind":"Argument","name":{"kind":"Name","value":"textContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"textContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"videoContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"youtubeContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"youtubeContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"component"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateContentComponentMutation, CreateContentComponentMutationVariables>;
export const UpdateContentComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContentComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"baseComponentInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContentComponentBaseInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"textContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TextContentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"youtubeContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContentComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"baseComponentInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"baseComponentInfo"}}},{"kind":"Argument","name":{"kind":"Name","value":"textContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"textContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"videoContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"youtubeContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"youtubeContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"component"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableTextContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableVideoContentComponent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableYouTubeContentComponent"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableTextContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableVideoContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableYouTubeContentComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YouTubeContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"is_required"}},{"kind":"Field","name":{"kind":"Name","value":"component_id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube_video_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateContentComponentMutation, UpdateContentComponentMutationVariables>;
export const EditableCourseSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditableCourseSections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editableCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableCourseSection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourseSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]} as unknown as DocumentNode<EditableCourseSectionsQuery, EditableCourseSectionsQueryVariables>;
export const CreateCourseSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourseSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseSectionInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseSectionInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourseSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseSectionInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseSectionInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courseSection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCourseSectionMutation, CreateCourseSectionMutationVariables>;
export const UpdateCourseSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourseSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseSectionInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCourseSectionInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourseSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseSectionInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseSectionInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courseSection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseSectionMutation, UpdateCourseSectionMutationVariables>;
export const DeleteCourseSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourseSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCourseSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCourseSectionMutation, DeleteCourseSectionMutationVariables>;
export const UpdateCourseSectionRanksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourseSectionRanks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sectionRanks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCourseSectionRankInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourseSectionRanks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sectionRanks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sectionRanks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseSectionRanksMutation, UpdateCourseSectionRanksMutationVariables>;
export const EditableCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditableCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editableCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableCourse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"external_resource_link"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]} as unknown as DocumentNode<EditableCourseQuery, EditableCourseQueryVariables>;
export const UpdateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCourseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCourseInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCourseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCourseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableCourse"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"external_resource_link"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}}]}}]} as unknown as DocumentNode<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const TeacherCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TeacherCoursesQuery, TeacherCoursesQueryVariables>;
export const CreateProgramPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateProgramPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<CreateProgramPageQuery, CreateProgramPageQueryVariables>;
export const CreateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProgramMutation, CreateProgramMutationVariables>;
export const EditableProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditableProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editableProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableProgram"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacherCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editableVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}}]}}]}}]} as unknown as DocumentNode<EditableProgramQuery, EditableProgramQueryVariables>;
export const UpdateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProgramInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProgramInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProgramInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProgramInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EditableProgram"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Subject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EditableProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Subject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editableVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}}]}}]}}]} as unknown as DocumentNode<UpdateProgramMutation, UpdateProgramMutationVariables>;
export const DeleteProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteProgramMutation, DeleteProgramMutationVariables>;
export const UpdateProgramVersionCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProgramVersionCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProgramVersionCoursesInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProgramVersionCoursesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgramVersionCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProgramVersionCoursesInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProgramVersionCoursesInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}}]} as unknown as DocumentNode<UpdateProgramVersionCoursesMutation, UpdateProgramVersionCoursesMutationVariables>;
export const PublishProgramVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishProgramVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishProgramVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}},{"kind":"Field","name":{"kind":"Name","value":"published_at"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}}]} as unknown as DocumentNode<PublishProgramVersionMutation, PublishProgramVersionMutationVariables>;
export const CreateProgramVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProgramVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgramVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersion"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersionCourseEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisiteCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramCourse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramVersion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramVersion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courseEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramVersionCourseEntry"}}]}}]}}]} as unknown as DocumentNode<CreateProgramVersionMutation, CreateProgramVersionMutationVariables>;
export const TeacherProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeacherProgram"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeacherProgram"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"is_published"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TeacherProgramsQuery, TeacherProgramsQueryVariables>;
export const DashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"instructorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instructor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"instructorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Instructor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Instructor"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DashboardQuery, DashboardQueryVariables>;
export const ExploreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Explore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjectsWithLinkedContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExploreSubject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExploreSubject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}}]}}]}}]} as unknown as DocumentNode<ExploreQuery, ExploreQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrolledCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomeCourse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomeCourse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Statistics"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomeCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Statistics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Statistics"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrolledCoursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCoursesCount"}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const InstructorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Instructor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instructor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Teacher"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Teacher"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<InstructorQuery, InstructorQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"date_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountRole"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ChangeProfilePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeProfilePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePictureDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfilePictureDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeProfilePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profilePictureDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePictureDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeProfilePictureMutation, ChangeProfilePictureMutationVariables>;
export const RemoveProfilePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProfilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProfilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveProfilePictureMutation, RemoveProfilePictureMutationVariables>;
export const ProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Program"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Program"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Program"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}}]}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}},{"kind":"Field","name":{"kind":"Name","value":"isAllowedToFollow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestVersionNumber"}}]}}]} as unknown as DocumentNode<ProgramQuery, ProgramQueryVariables>;
export const EnrollInProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnrollInProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollInProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latestVersionNumber"}}]}}]}}]}}]} as unknown as DocumentNode<EnrollInProgramMutation, EnrollInProgramMutationVariables>;
export const UnenrollFromProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnenrollFromProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unenrollFromProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latestVersionNumber"}}]}}]}}]}}]} as unknown as DocumentNode<UnenrollFromProgramMutation, UnenrollFromProgramMutationVariables>;
export const UpgradeToLatestProgramVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpgradeToLatestProgramVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upgradeToLatestProgramVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"latestVersionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpgradeToLatestProgramVersionMutation, UpgradeToLatestProgramVersionMutationVariables>;
export const SubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubjectContent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubjectContent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Subject"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"participationCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"programs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"denomination"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearnersCount"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SubjectQuery, SubjectQueryVariables>;