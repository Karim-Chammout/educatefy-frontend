import { Navigate, Route, Routes } from 'react-router';

import {
  Catalog,
  Course,
  Instructor,
  Login,
  LoginCallback,
  NotFound,
  Program,
  Register,
  Subject,
} from './LazyComponent';
import Redirect from './Redirect';
import RouteWrapper from './RouteWrapper';

/* 
  list of routes to redirect to login page and show
  an error message if a user tries to visit without loging in.
*/
const privateRoutes = ['/profile', '/dashboard/*', '/course/:slug/*'];

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" replace />} />
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
        path="/catalog"
        element={
          <RouteWrapper>
            <Catalog />
          </RouteWrapper>
        }
      />
      <Route
        path="/subject/:id"
        element={
          <RouteWrapper>
            <Subject />
          </RouteWrapper>
        }
      />
      <Route
        path="/teacher/:id"
        element={
          <RouteWrapper>
            <Instructor />
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
      <Route
        path="/program/:programSlug"
        element={
          <RouteWrapper>
            <Program />
          </RouteWrapper>
        }
      />
      <Route
        path="/program/:programSlug/course/:slug"
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
