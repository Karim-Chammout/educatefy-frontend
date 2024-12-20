import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { useMeQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, SetupProfile } from '@/ui/compositions';
import { hasMissingAccountData } from '@/utils/hasMissingAccountData';

import { useLanguageSelection } from '@/hooks';
import { isLoggedIn } from './apolloClient';
import PageTemplate from './PageTemplate';
import PublicPageTemplate from './PublicPageTemplate';
import {
  Explore,
  Home,
  Login,
  LoginCallback,
  NotFound,
  Profile,
  Register,
} from './routes/LazyComponent';
import PublicRoutes from './routes/PublicRoutes';

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
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/openid/callback" element={<LoginCallback />} />
        <Route path="/profile" element={<Profile />} />

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
