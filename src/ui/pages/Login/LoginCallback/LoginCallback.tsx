import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Loader } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { BASE_URL, isLoggedIn } from '@/ui/layout/apolloClient';
import { SIGN_UP_FIRST } from '@/utils/constants';

const LoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToasterVisibility } = useContext(ToasterContext);

  const getQueryParams = (search: string) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);

  const state = queryParams.get('state');
  const code = queryParams.get('code');
  const scope = queryParams.get('scope');
  const authuser = queryParams.get('authuser');
  const prompt = queryParams.get('prompt');

  const oidcID = state && JSON.parse(state).oidcID;

  useEffect(() => {
    const sendAuthRequest = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/openid/callback/${oidcID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            state,
            code,
            scope,
            authuser,
            prompt,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        localStorage.setItem('JWT', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        isLoggedIn(true);

        navigate('/explore');
      } catch (error) {
        if ((error as Error).message === SIGN_UP_FIRST) {
          setToasterVisibility({
            newDuration: null,
            newText: 'You have to create an account first!',
            newType: 'error',
          });
          navigate('/register');

          return;
        }

        setToasterVisibility({
          newDuration: null,
          newText: 'Something went wrong. Please try again later!',
          newType: 'error',
        });
        navigate('/login');
      }
    };

    sendAuthRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default LoginCallback;
