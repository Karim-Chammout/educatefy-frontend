import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CourseReviewFragment,
  useDeleteCourseRatingMutation,
  useRateCourseMutation,
} from '@/generated/graphql';
import { ToasterContext } from '@/ui/context';

const ReviewForm = ({
  courseId,
  existingReview,
  onClose,
}: {
  courseId: string;
  existingReview?: CourseReviewFragment | null;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.review || '');

  const [rateCourse, { loading }] = useRateCourseMutation();
  const [deleteCourseRating, { loading: isDeleting }] = useDeleteCourseRatingMutation();

  const handleSubmit = async () => {
    if (!rating && !reviewText) {
      return;
    }

    await rateCourse({
      variables: {
        ratingInfo: {
          courseId,
          rating: rating || null,
          review: reviewText || null,
        },
      },
      update(cache, res) {
        if (res.data?.rateCourse && res.data.rateCourse.success) {
          const courseRef = cache.identify({
            __typename: 'Course',
            id: courseId,
          });

          if (courseRef) {
            cache.modify({
              id: courseRef,
              fields: {
                rating: () => res.data?.rateCourse?.course?.rating || 0,
                ratingsCount: (existingCount: number) =>
                  !existingReview ? existingCount + 1 : existingCount,
                reviews: (courseReviews) => {
                  const existingReviews = courseReviews as CourseReviewFragment[];
                  const newReviews = res.data?.rateCourse?.course?.reviews || [];

                  if (!existingReview) {
                    const newReview = newReviews.find(
                      (newRev) => !existingReviews.some((existing) => existing.id === newRev.id),
                    );

                    if (newReview) {
                      return [...existingReviews, newReview];
                    }
                  }

                  return existingReviews.map((review) => {
                    const updatedReview = newReviews.find((r) => r.id === review.id);

                    return updatedReview || review;
                  });
                },
                viewerReview: () => {
                  const newReviews = res.data?.rateCourse?.course?.reviews || [];

                  return newReviews.find((review) => review.isEditable) || null;
                },
              },
            });
          }
        }
      },
      onCompleted(data) {
        if (data.rateCourse?.errors?.length === 0) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('course.reviewSubmitted'),
            newType: 'success',
          });
          onClose();
        }
      },
      onError() {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('error.message'),
          newType: 'error',
        });
      },
    });
  };

  const handleDeleteRating = async () => {
    if (!existingReview) return;

    await deleteCourseRating({
      variables: {
        ratingInfo: {
          courseId,
          courseRateId: existingReview.id,
        },
      },
      update(cache) {
        const courseRef = cache.identify({
          __typename: 'Course',
          id: courseId,
        });

        if (courseRef) {
          cache.modify({
            id: courseRef,
            fields: {
              ratingsCount: (existingCount: number) => existingCount - 1,
              reviews: (courseReviews) => {
                const existingReviews = courseReviews as CourseReviewFragment[];

                return existingReviews.filter((review) => review.id !== existingReview.id);
              },
              viewerReview: () => null,
            },
          });
        }
      },
      onCompleted(data) {
        if (data.deleteCourseRating?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('course.reviewDeleted'),
            newType: 'success',
          });
          onClose();
        }
      },
      onError() {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('error.message'),
          newType: 'error',
        });
      },
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue || 0)}
          precision={0.5}
          size="large"
        />
      </Box>
      <TextField
        label={t('course.yourReview')}
        multiline
        rows={4}
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={(!rating && !reviewText) || loading}
          >
            {t('common.submit')}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </Box>
        {existingReview && (
          <Button
            color="error"
            variant="outlined"
            onClick={handleDeleteRating}
            disabled={isDeleting}
          >
            {t('common.delete')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ReviewForm;
