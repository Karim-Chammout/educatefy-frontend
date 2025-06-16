import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t('course.reviews')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {ratingsCount > 0 && (
          <Typography variant="h4" sx={{ mr: 1 }}>
            {averageRating}
          </Typography>
        )}
        <Typography variant="body1" color="text.secondary">
          ({ratingsCount} {t('course.reviews')})
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      {reviews.length === 0 ? (
        <Typography variant="body1">{t('course.emptyReviews')}</Typography>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </Paper>
  );
};

export default ReviewsList;
