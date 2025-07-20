import RateReviewIcon from '@mui/icons-material/RateReview';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CourseFragment, CourseStatus } from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';

import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';

const ReviewsList = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const { t } = useTranslation();

  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);

  const { id, ratingsCount, rating, viewerReview, reviews, status } = courseInfo;

  const isEnrolledOrCompleted =
    status === CourseStatus.Enrolled || status === CourseStatus.Completed;

  const hasMadeProgress = useMemo(() => {
    return courseInfo.sections.some((section) =>
      section.items.some((item) =>
        item.components.some((component) => component.progress?.is_completed),
      ),
    );
  }, [courseInfo.sections]);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h5" gutterBottom>
              {t('course.reviews')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {ratingsCount > 0 && (
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {rating.toFixed(1)}
                </Typography>
              )}
              <Typography variant="body1" color="text.secondary">
                ({ratingsCount} {t('course.reviews')})
              </Typography>
            </Box>
          </div>
          {isEnrolledOrCompleted && hasMadeProgress && (
            <Box>
              <Button onClick={() => setIsReviewModalOpened(true)} startIcon={<RateReviewIcon />}>
                {viewerReview ? t('course.editReview') : t('course.leaveReview')}
              </Button>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        {reviews.length === 0 ? (
          <Typography variant="body1">{t('course.emptyReviews')}</Typography>
        ) : (
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        )}
      </Paper>

      <Modal
        open={isReviewModalOpened}
        onClose={() => setIsReviewModalOpened(false)}
        title={viewerReview ? t('course.editReview') : t('course.leaveReview')}
        maxWidth="xs"
      >
        <ReviewForm
          courseId={id}
          onClose={() => setIsReviewModalOpened(false)}
          existingReview={viewerReview}
        />
      </Modal>
    </>
  );
};

export default ReviewsList;
