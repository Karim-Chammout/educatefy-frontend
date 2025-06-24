import { lazy } from 'react';

export const Course = lazy(() => import('@/ui/pages/Course'));
export const Courses = lazy(() => import('@/ui/pages/Dashboard/Courses'));
export const CourseSection = lazy(
  () => import('@/ui/pages/Dashboard/Courses/UpdateCourse/CourseSection'),
);
export const CourseSections = lazy(
  () => import('@/ui/pages/Dashboard/Courses/UpdateCourse/CourseSections'),
);
export const CourseSectionItem = lazy(
  () => import('@/ui/pages/Dashboard/Courses/UpdateCourse/CourseSectionItem'),
);
export const CreateCourse = lazy(() => import('@/ui/pages/Dashboard/Courses/CreateCourse'));
export const Dashboard = lazy(() => import('@/ui/pages/Dashboard'));
export const Explore = lazy(() => import('@/ui/pages/Explore'));
export const Home = lazy(() => import('@/ui/pages/Home'));
export const Instructor = lazy(() => import('@/ui/pages/Instructor'));
export const Login = lazy(() => import('@/ui/pages/Login'));
export const LoginCallback = lazy(() => import('@/ui/pages/Login/LoginCallback'));
export const NotFound = lazy(() => import('@/ui/pages/NotFound'));
export const Profile = lazy(() => import('@/ui/pages/Profile'));
export const Register = lazy(() => import('@/ui/pages/Register'));
export const Section = lazy(() => import('@/ui/pages/Course/Section'));
export const Subject = lazy(() => import('@/ui/pages/Subject'));
export const UpdateCourse = lazy(() => import('@/ui/pages/Dashboard/Courses/UpdateCourse'));
