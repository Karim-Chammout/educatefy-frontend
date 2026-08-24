import { useQuery } from '@apollo/client/react';

import { UserProfileDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';

import Profile from './Profile';
import ProfileSkeleton from './ProfileSkeleton';

const ProfileContainer = () => {
  const { loading, error, data } = useQuery(UserProfileDocument);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  const { me, countries, subjects } = data;

  return <Profile userInfo={me} countries={countries} subjects={subjects} />;
};

export default ProfileContainer;
