import { Route, Routes } from 'react-router';

import { Course, Explore, Login, LoginCallback, NotFound, Register } from './LazyComponent';
import Redirect from './Redirect';
import RouteWrapper from './RouteWrapper';

/* 
  list of routes to redirect to login page and show
  an error message if a user tries to visit without loging in.
*/
const privateRoutes = ['/', '/profile', '/dashboard/*', '/course/:slug/*'];

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
      <Route
        path="/course/:slug"
        element={
          <RouteWrapper>
            <Course />
          </RouteWrapper>
        }
      />

      {privateRoutes.map((r) => (
        <Route key={r} path={r} element={<Redirect from={r} />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
