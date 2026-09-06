import { useMutation } from '@apollo/client/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { CourseDocument, RateCourseDocument } from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

type CompletedCourseModalProps = {
  open: boolean;
  courseId: string;
  onClose: () => void;
};

const CompletedCourseModal = ({ open, courseId, onClose }: CompletedCourseModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [rateCourse, { loading }] = useMutation(RateCourseDocument);

  const goToCourse = () => {
    onClose();
    navigate(`/course/${slug}`);
  };

  const handleSubmit = () => {
    rateCourse({
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
                reviews: () => res.data?.rateCourse?.course?.reviews || [],
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
          goToCourse();
        }
      },
      onError() {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('error.message'),
          newType: 'error',
        });
      },
      refetchQueries: [{ query: CourseDocument, variables: { slug } }],
    });
  };

  const canSubmit = rating > 0 || reviewText.trim().length > 0;

  return (
    <Modal open={open} onClose={goToCourse} maxWidth="md">
      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 72, color: 'success.main', mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('course.completedCelebrationTitle')}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {t('course.completedCelebrationSubtitle')}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 600 }}>
          {t('course.completedReviewPrompt')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 1 }}>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue || 0)}
            precision={0.5}
            size="large"
          />
          <TextField
            label={t('course.yourReview')}
            multiline
            rows={4}
            fullWidth
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading || !canSubmit}
          >
            {t('common.submit')}
          </Button>
          <Button variant="outlined" size="large" onClick={goToCourse}>
            {t('course.completedSkip')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CompletedCourseModal;
