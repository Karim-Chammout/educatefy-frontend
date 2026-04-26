import { useQuery } from '@apollo/client/react';

import { UserProfileDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Profile from './Profile';

const ProfileContainer = () => {
  const { loading, error, data } = useQuery(UserProfileDocument);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  const { me, countries, subjects } = data;

  return <Profile userInfo={me} countries={countries} subjects={subjects} />;
};

export default ProfileContainer;
