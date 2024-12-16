import { useUserProfileQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Profile from './Profile';

const ProfileContainer = () => {
  const { loading, error, data } = useUserProfileQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  const { me, countries } = data;

  return (
    <div>
      <Profile userInfo={me} countries={countries} />
    </div>
  );
};

export default ProfileContainer;
