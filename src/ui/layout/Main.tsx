import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AccountRole, useMeQuery } from '@/generated/graphql';
import { useLanguageSelection } from '@/hooks';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, SetupProfile } from '@/ui/compositions';
import { hasMissingAccountData } from '@/utils/hasMissingAccountData';

import { isLoggedIn } from './apolloClient';
import PageTemplate from './PageTemplate';
import PublicPageTemplate from './PublicPageTemplate';
import { DashboardRoutes } from './routes/DashboardRoutes';
import {
  Courses,
  CreateCourse,
  Dashboard,
  Explore,
  Home,
  NotFound,
  Profile,
  UpdateCourse,
} from './routes/LazyComponent';
import PublicRoutes from './routes/PublicRoutes';
import RouteWrapper from './routes/RouteWrapper';

const PublicPagesView = () => {
  return (
    <PublicPageTemplate>
      <PublicRoutes />
    </PublicPageTemplate>
  );
};

const PrivatePagesView = () => {
  const { changeLanguage } = useLanguageSelection();
  const { loading, error, data } = useMeQuery();

  // Update the language based on the preferredLanguage of the user
  useEffect(() => {
    if (data?.me.preferredLanguage) {
      changeLanguage(data.me.preferredLanguage);
    }
  }, [data?.me.preferredLanguage, changeLanguage]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  const hasIncompleteAccountData = data.me && hasMissingAccountData(data?.me);

  if (hasIncompleteAccountData) {
    return (
      <PageTemplate>
        <SetupProfile userInfo={data.me} />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Routes>
        <Route
          path="/"
          element={
            <RouteWrapper>
              <Home />
            </RouteWrapper>
          }
        />
        <Route
          path="/explore"
          element={
            <RouteWrapper>
              <Explore />
            </RouteWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <RouteWrapper>
              <Profile />
            </RouteWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={<DashboardRoutes hasPermission={data.me.accountRole === AccountRole.Teacher} />}
        >
          <Route
            path="/dashboard"
            element={
              <RouteWrapper>
                <Dashboard />
              </RouteWrapper>
            }
          />
          <Route
            path="/dashboard/courses"
            element={
              <RouteWrapper>
                <Courses />
              </RouteWrapper>
            }
          />
          <Route
            path="/dashboard/courses/create"
            element={
              <RouteWrapper>
                <CreateCourse />
              </RouteWrapper>
            }
          />
        </Route>
        <Route
          path="/dashboard/courses/update/:id"
          element={
            <RouteWrapper>
              <UpdateCourse />
            </RouteWrapper>
          }
        />

        <Route path="/login" element={<Navigate to="/explore" />} />
        <Route path="/register" element={<Navigate to="/explore" />} />
        <Route path="/openid/callback" element={<Navigate to="/explore" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTemplate>
  );
};

const Main = () => {
  const isUserLoggedIn = useReactiveVar(isLoggedIn);

  if (!isUserLoggedIn) {
    return <PublicPagesView />;
  }

  return <PrivatePagesView />;
};

export default Main;
