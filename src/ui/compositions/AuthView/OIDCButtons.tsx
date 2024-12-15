import { useQuery } from '@apollo/client';
import GoogleIcon from '@mui/icons-material/Google';
import { ReactNode } from 'react';

import { OpenIdClientDocument, OpenIdClientQuery } from '@/generated/graphql';
import { Button, Loader } from '@/ui/components';
import { BASE_URL } from '@/ui/layout/apolloClient';

type OIDCButtonsType = {
  isRegister?: boolean;
  userType?: 'student' | 'teacher';
  disabled?: boolean;
};

const redirectURL = `${BASE_URL}/api/openid/redirect/`;

const buttonIcon: { [key: string]: ReactNode } = {
  google: <GoogleIcon />,
};

const OIDCButtons = ({ isRegister, userType, disabled }: OIDCButtonsType) => {
  const { error, data, loading } = useQuery<OpenIdClientQuery>(OpenIdClientDocument);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return null;
  }

  return data.openIdClients.map((oidc) => {
    const url = isRegister
      ? `${redirectURL}${oidc.id}?userRole=${userType}`
      : `${redirectURL}${oidc.id}`;

    return (
      <Button
        key={oidc.id}
        fullWidth
        variant="contained"
        sx={{ my: 3 }}
        LinkComponent="a"
        href={url}
        startIcon={buttonIcon[oidc.identity_provider]}
        disabled={disabled}
      >
        {oidc.button_text}
      </Button>
    );
  });
};

export default OIDCButtons;
