import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { Loader } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { BASE_URL } from '@/ui/layout/apolloClient';
import { SIGN_UP_FIRST } from '@/utils/constants';

const LoginCallback = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const userAuth = useContext(AuthContext);
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
    const controller = new AbortController();

    const sendAuthRequest = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/openid/callback/${oidcID}`, {
          method: 'POST',
          credentials: 'include',
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
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        localStorage.setItem('refreshToken', data.refreshToken);
        await userAuth.refresh();

        const redirectPath = sessionStorage.getItem('postLoginRedirect') || '/explore';

        navigate(redirectPath, { replace: true });

        sessionStorage.removeItem('postLoginRedirect');
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;

        if ((error as Error).message === SIGN_UP_FIRST) {
          setToasterVisibility({
            newDuration: null,
            newText: t('login.createAccountFirst'),
            newType: 'error',
          });
          navigate('/register');

          return;
        }

        setToasterVisibility({
          newDuration: null,
          newText: t('login.somethingWentWrong'),
          newType: 'error',
        });
        navigate('/login');
      }
    };

    sendAuthRequest();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default LoginCallback;
