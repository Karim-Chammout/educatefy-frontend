import { lazy } from 'react';

export const Courses = lazy(() => import('@/ui/pages/Dashboard/Courses'));
export const CreateCourse = lazy(() => import('@/ui/pages/Dashboard/Courses/CreateCourse'));
export const Dashboard = lazy(() => import('@/ui/pages/Dashboard'));
export const Explore = lazy(() => import('@/ui/pages/Explore'));
export const Home = lazy(() => import('@/ui/pages/Home'));
export const Login = lazy(() => import('@/ui/pages/Login'));
export const LoginCallback = lazy(() => import('@/ui/pages/Login/LoginCallback'));
export const NotFound = lazy(() => import('@/ui/pages/NotFound'));
export const Profile = lazy(() => import('@/ui/pages/Profile'));
export const Register = lazy(() => import('@/ui/pages/Register'));
