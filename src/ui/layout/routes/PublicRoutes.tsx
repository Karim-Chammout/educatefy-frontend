import { Navigate, Route, Routes } from 'react-router';

import { ACCESS_DENIED } from '@/utils/enum';

import { Explore, Login, LoginCallback, NotFound, Register } from './LazyComponent';

/* 
  list of routes to redirect to login page and show
  an error message if a user tries to visit without loging in.
*/
const privateRoutes = ['/'];

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/openid/callback" element={<LoginCallback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore" element={<Explore />} />
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
