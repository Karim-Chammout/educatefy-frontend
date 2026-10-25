import { describe, expect, it, vi } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { OpenIdClientDocument } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';

import LoginPopup from './LoginPopup';

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

const renderPopup = (handleRegisterSwitch = vi.fn()) => {
  renderWithProviders(<LoginPopup handleRegisterSwitch={handleRegisterSwitch} />, {
    apolloMocks: [oidcClientsMock],
  });

  return { handleRegisterSwitch };
};

describe('LoginPopup', () => {
  it('renders the Google sign-in button', async () => {
    renderPopup();

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    expect(await screen.findByRole('link', { name: 'Continue with Google' })).toBeVisible();
  });

  it('switches to the register popup from the Sign Up link', async () => {
    const { handleRegisterSwitch } = renderPopup();

    await userEvent.click(screen.getByText('Sign Up'));

    expect(handleRegisterSwitch).toHaveBeenCalledTimes(1);
  });
});
