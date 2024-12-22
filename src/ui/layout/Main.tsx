import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { useMeQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, SetupProfile } from '@/ui/compositions';
import { hasMissingAccountData } from '@/utils/hasMissingAccountData';

import { useLanguageSelection } from '@/hooks';
import { isLoggedIn } from './apolloClient';
import PageTemplate from './PageTemplate';
import PublicPageTemplate from './PublicPageTemplate';
import { Explore, Home, NotFound, Profile } from './routes/LazyComponent';
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
