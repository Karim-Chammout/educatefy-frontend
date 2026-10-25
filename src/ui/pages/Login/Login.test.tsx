import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { OpenIdClientDocument } from '@/generated/graphql';
import { renderWithProviders, screen, waitFor } from '@/test/wrappers';
import { ToasterContext, ToasterProvider } from '@/ui/context';
import { BASE_URL } from '@/ui/layout/apolloClient';
import { ACCESS_DENIED } from '@/utils/constants';

import Login from './Login';

const oidcClientsMock: MockLink.MockedResponse = {
  request: { query: OpenIdClientDocument },
  result: {
    data: {
      openIdClients: [
        {
          __typename: 'OpenidClient',
          id: 'google',
          button_text: 'Continue with Google',
          button_icon: null,
          button_background_color: null,
          identity_provider: 'google',
        },
      ],
    },
  },
};

const renderLogin = (
  apolloMocks: MockLink.MockedResponse[] = [oidcClientsMock],
  route = '/login',
) =>
  renderWithProviders(
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>,
    { route, apolloMocks },
  );

const ToasterProbe = () => {
  const { isVisible, text } = useContext(ToasterContext);

  return isVisible ? <p role="status">{text}</p> : null;
};

describe('Login', () => {
  it('renders the heading, the Google sign-in button and the register link', async () => {
    renderLogin();

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeVisible();

    const googleButton = await screen.findByRole('link', { name: 'Continue with Google' });
    expect(googleButton).toHaveAttribute('href', `${BASE_URL}/api/openid/redirect/google`);

    expect(screen.getByRole('link', { name: 'Sign Up' })).toHaveAttribute('href', '/register');
  });

  it('shows the access-denied toaster when arriving from a protected page', async () => {
    renderWithProviders(
      <ToasterProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
                <ToasterProbe />
              </>
            }
          />
        </Routes>
      </ToasterProvider>,
      {
        route: { pathname: '/login', state: { action: ACCESS_DENIED } },
        apolloMocks: [oidcClientsMock],
      },
    );

    expect(await screen.findByRole('status')).toHaveTextContent(
      'You have to login to access this page!',
    );
  });

  it('renders the page without provider buttons when the OpenID clients query fails', async () => {
    renderLogin([{ request: { query: OpenIdClientDocument }, error: new Error('Network error') }]);

    await waitFor(() => expect(screen.queryByText('Loading...')).toBe(null));

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Continue with Google' })).toBe(null);
  });
});
