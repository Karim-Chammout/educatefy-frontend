import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import api from '@/api';
import { Loader } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { BASE_URL, isLoggedIn } from '@/ui/layout/apolloClient';

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
        const response = await api.post(
          `${BASE_URL}/api/openid/callback/${oidcID}`,
          JSON.stringify({
            state,
            code,
            scope,
            authuser,
            prompt,
          }),
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        localStorage.setItem('JWT', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        isLoggedIn(true);

        navigate('/explore');
      } catch (error) {
        console.error('Authentication error:', error);
        setToasterVisibility({
          newDuration: null,
          newText: 'Something went wrong. Please try again later!',
          newType: 'error',
        });
        navigate('/login');

        if ((error as Error).message.includes('SIGN_UP_FIRST')) {
          setToasterVisibility({
            newDuration: null,
            newText: 'You have to create an account first!',
            newType: 'error',
          });
          navigate('/register');
        }
      }
    };

    sendAuthRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default LoginCallback;
