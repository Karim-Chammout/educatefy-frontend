import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { OpenIdClientDocument } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';
import { BASE_URL } from '@/ui/layout/apolloClient';

import Register from './Register';

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

const renderRegister = (apolloMocks: MockLink.MockedResponse[] = [oidcClientsMock]) =>
  renderWithProviders(
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>,
    { route: '/register', apolloMocks },
  );

describe('Register', () => {
  it('asks for a user role before enabling the sign-up button', async () => {
    renderRegister();

    expect(screen.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    expect(screen.getByRole('alert')).toHaveTextContent('Select a user role:');

    const googleButton = await screen.findByRole('link', { name: 'Continue with Google' });
    expect(googleButton).toHaveAttribute('aria-disabled', 'true');

    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
  });

  it('passes the selected role to the OIDC button and confirms it in the alert', async () => {
    renderRegister();

    await userEvent.click(screen.getByRole('radio', { name: 'Student' }));

    const googleButton = screen.getByRole('link', { name: 'Continue with Google' });
    expect(googleButton).not.toHaveAttribute('aria-disabled');
    expect(googleButton).toHaveAttribute(
      'href',
      `${BASE_URL}/api/openid/redirect/google?userRole=student`,
    );
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-colorSuccess');
  });
});
