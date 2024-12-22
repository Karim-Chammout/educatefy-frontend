import { Navigate, Route, Routes } from 'react-router';

import { ACCESS_DENIED } from '@/utils/constants';

import { Explore, Login, LoginCallback, NotFound, Register } from './LazyComponent';
import RouteWrapper from './RouteWrapper';

/* 
  list of routes to redirect to login page and show
  an error message if a user tries to visit without loging in.
*/
const privateRoutes = ['/', '/profile'];

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/openid/callback"
        element={
          <RouteWrapper>
            <LoginCallback />
          </RouteWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <RouteWrapper>
            <Login />
          </RouteWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <RouteWrapper>
            <Register />
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
      {privateRoutes.map((r) => (
        <Route
          key={r}
          path={r}
          element={<Navigate to="/login" replace state={{ action: ACCESS_DENIED }} />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
