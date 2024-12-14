import { useNavigate } from 'react-router';

import { Button } from '@/ui/components';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Not found</h1>
      <Button onClick={() => navigate('/explore')}>Go to Explore</Button>
    </div>
  );
};

export default NotFound;
