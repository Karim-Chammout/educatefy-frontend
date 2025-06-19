import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { ACCESS_DENIED } from '@/utils/constants';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

const Redirect = ({ from }: { from?: string }) => {
  const location = useLocation();
  const state = { from, action: ACCESS_DENIED };

  useEffect(() => {
    savePostLoginRedirectPath(location.pathname);
  }, [location.pathname]);

  return <Navigate to="/login" replace state={state} />;
};

export default Redirect;
