import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { CourseReviewFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import ReviewItem from './ReviewItem';

const ReviewsList = ({
  reviews,
  averageRating,
  ratingsCount,
}: {
  reviews: CourseReviewFragment[];
  averageRating: number;
  ratingsCount: number;
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews{/* 🚨 TRANSLATIONS 🚨 */}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ mr: 1 }}>
          {averageRating}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ({ratingsCount} reviews)
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      {reviews.length === 0 ? (
        <Typography variant="body1">No reviews yet</Typography>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </Box>
  );
};

export default ReviewsList;
