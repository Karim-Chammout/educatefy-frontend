import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';

import person from '@/assets/person.png';
import { CourseReviewFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

const ReviewItem = ({ review }: { review: CourseReviewFragment }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={review.reviewer.avatar_url || person} sx={{ mr: 2 }} />
        <Box>
          <Typography variant="subtitle1">
            {review.reviewer.first_name} {review.reviewer.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(review.created_at), 'PPP')}
          </Typography>
        </Box>
      </Box>
      <Rating value={review.rating} precision={0.5} readOnly />
      {review.review && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          {review.review}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewItem;
