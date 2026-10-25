import { describe, expect, it, vi } from 'vitest';

import type { MockLink } from '@apollo/client/testing';
import { OpenIdClientDocument } from '@/generated/graphql';
import { renderWithProviders, screen, userEvent } from '@/test/wrappers';
import { BASE_URL } from '@/ui/layout/apolloClient';

import RegisterPopup from './RegisterPopup';

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

const renderPopup = (handleLoginSwitch = vi.fn()) => {
  renderWithProviders(<RegisterPopup handleLoginSwitch={handleLoginSwitch} />, {
    apolloMocks: [oidcClientsMock],
  });

  return { handleLoginSwitch };
};

describe('RegisterPopup', () => {
  it('passes the selected role to the OIDC button', async () => {
    renderPopup();

    expect(await screen.findByRole('link', { name: 'Continue with Google' })).toBeVisible();

    await userEvent.click(screen.getByRole('radio', { name: 'Teacher' }));

    expect(screen.getByRole('link', { name: 'Continue with Google' })).toHaveAttribute(
      'href',
      `${BASE_URL}/api/openid/redirect/google?userRole=teacher`,
    );
  });

  it('switches to the login popup from the Login link', async () => {
    const { handleLoginSwitch } = renderPopup();

    await userEvent.click(screen.getByText('Login'));

    expect(handleLoginSwitch).toHaveBeenCalledTimes(1);
  });
});
