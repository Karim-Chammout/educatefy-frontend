import { useMutation } from '@apollo/client/react';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { FollowTeacherDocument, TeacherFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { ContentCard, RichTextContent } from '@/ui/compositions';
import { getTeacherPath } from '@/utils/getTeacherPath';
import { hasRichTextContent } from '@/utils/hasRichTextContent';
import {
  darkModeHostileBrands,
  getSocialLinkText,
  getSocialPlatformIcon,
  socialPlatformBrandColors,
} from '@/utils/socialPlatform';

import {
  BioText,
  FollowActions,
  FollowButtonContent,
  FollowerCount,
  HeaderIdentity,
  HeaderSection,
  InstructorName,
  InstructorInfo,
  SocialLinkButton,
  SocialLinksGroup,
  SocialLinksLabel,
  SocialLinksRow,
  SocialLinkText,
  StatCard,
  StatContent,
  StatIcon,
  SubjectsRow,
} from './Instructor.style';

const Instructor = ({ instructor }: { instructor: TeacherFragment }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [followTeacher, { loading: updatingFollow }] = useMutation(FollowTeacherDocument);

  const handleFollowTeacher = async () => {
    await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: instructor.id,
        },
      },
      update: (cache, { data }) => {
        const isFollowing = data?.followTeacher?.isFollowing;

        if (isFollowing === undefined || isFollowing === null) {
          return;
        }

        cache.modify({
          id: cache.identify(instructor),
          fields: {
            isFollowed: () => isFollowing,
            followersCount: (current: number) => Math.max(0, current + (isFollowing ? 1 : -1)),
          },
        });
      },
    });
  };

  const totalStudents = instructor.courses.reduce(
    (sum, course) => sum + course.participationCount,
    0,
  );

  const ratedCourses = instructor.courses.filter((course) => course.ratingsCount > 0);
  const ratingsWeight = ratedCourses.reduce((sum, course) => sum + course.ratingsCount, 0);
  const averageRating =
    ratingsWeight > 0
      ? ratedCourses.reduce((sum, course) => sum + course.rating * course.ratingsCount, 0) /
        ratingsWeight
      : null;

  const programCount = instructor.programs.length;

  const courseCount = instructor.courses.length;
  const bio = instructor.bio?.trim();

  return (
    <div style={{ marginTop: '16px' }}>
      <HeaderSection variant="outlined">
        <Avatar
          src={instructor.avatar_url || undefined}
          alt={`${instructor.first_name} ${instructor.last_name}`}
          sx={{
            width: 120,
            height: 120,
            flexShrink: 0,
            border: `4px solid ${theme.palette.background.paper}`,
            boxShadow: theme.shadows[8],
          }}
        />

        <InstructorInfo>
          <HeaderIdentity>
            <InstructorName component="h1">
              {instructor.first_name} {instructor.last_name}
            </InstructorName>

            {instructor.subjects.length > 0 && (
              <SubjectsRow>
                {instructor.subjects.map((subject) => (
                  <Chip
                    key={subject.id}
                    label={subject.denomination}
                    color="primary"
                    variant="outlined"
                    size="small"
                    clickable
                    onClick={() => navigate(`/subject/${subject.id}`)}
                    sx={{
                      maxWidth: '100%',
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                  />
                ))}
              </SubjectsRow>
            )}

            {instructor.isAllowedToFollow && (
              <FollowActions>
                <Button
                  variant={instructor.isFollowed ? 'outlined' : 'contained'}
                  startIcon={instructor.isFollowed ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
                  onClick={handleFollowTeacher}
                  disabled={updatingFollow}
                >
                  <FollowButtonContent>
                    <span>
                      {instructor.isFollowed ? t('instructor.unfollow') : t('instructor.follow')}
                    </span>
                    <FollowerCount
                      role="img"
                      aria-label={t('instructor.followersCount', {
                        count: instructor.followersCount,
                      })}
                    >
                      {instructor.followersCount}
                    </FollowerCount>
                  </FollowButtonContent>
                </Button>
              </FollowActions>
            )}
          </HeaderIdentity>

          {bio && <BioText component="p">{bio}</BioText>}

          {instructor.socialLinks.length > 0 && (
            <SocialLinksGroup>
              <SocialLinksLabel variant="caption" component="span">
                {t('instructor.socialLinks')}
              </SocialLinksLabel>

              <SocialLinksRow>
                {instructor.socialLinks.map((link) => {
                  const IconComponent = getSocialPlatformIcon(link.platform);
                  const brandColor = socialPlatformBrandColors[link.platform];
                  const iconColor =
                    brandColor &&
                    !(theme.palette.mode === 'dark' && darkModeHostileBrands.has(link.platform))
                      ? brandColor
                      : theme.palette.text.secondary;

                  return (
                    <SocialLinkButton
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={getSocialLinkText(link)}
                    >
                      <IconComponent aria-hidden="true" sx={{ fontSize: 20, color: iconColor }} />
                      <SocialLinkText>{getSocialLinkText(link)}</SocialLinkText>
                      {link.isPrimary && (
                        <StarIcon
                          aria-hidden="true"
                          sx={{ fontSize: 14, color: 'warning.main', flexShrink: 0 }}
                        />
                      )}
                    </SocialLinkButton>
                  );
                })}
              </SocialLinksRow>
            </SocialLinksGroup>
          )}
        </InstructorInfo>
      </HeaderSection>

      {hasRichTextContent(instructor.description) && (
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1.5 }}>
            {t('account.about')}
          </Typography>
          <RichTextContent value={instructor.description} />
        </Paper>
      )}

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xxs: 12, sm: 6, md: 3 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <WorkspacesIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {programCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instructor.programs', {
                    count: programCount,
                  })}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>

          <Grid size={{ xxs: 12, sm: 6, md: 3 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {courseCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instructor.courses', {
                    count: courseCount,
                  })}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>

          <Grid size={{ xxs: 12, sm: 6, md: 3 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <GroupIcon sx={{ fontSize: 32, color: 'success.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {totalStudents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instructor.enrollments', {
                    count: totalStudents,
                  })}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>

          <Grid size={{ xxs: 12, sm: 6, md: 3 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <StarIcon sx={{ fontSize: 32, color: 'warning.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {averageRating !== null ? averageRating.toFixed(1) : '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('averageCourseRating')}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>
        </Grid>
      </Box>

      {(instructor.courses.length > 0 || instructor.programs.length > 0) && (
        <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            {t('instructor.contentBy', {
              name: instructor.first_name,
            })}
          </Typography>

          <Grid container spacing={3}>
            {instructor.programs.map((program) => (
              <Grid
                key={program.id}
                size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ContentCard
                  type="program"
                  title={program.denomination}
                  linkPath={`/program/${program.slug}`}
                  teacherName={`${program.instructor.first_name} ${program.instructor.last_name}`}
                  teacherAvatar={program.instructor.avatar_url || person}
                  teacherLink={getTeacherPath(program.instructor.id)}
                  image={program.image || fallbackImage}
                  difficulty={program.level}
                  studentsCount={program.enrolledLearnersCount}
                  coursesCount={program.currentVersion.courses.length}
                />
              </Grid>
            ))}
            {instructor.courses.map((course) => (
              <Grid
                key={course.id}
                size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ContentCard
                  type="course"
                  title={course.denomination}
                  linkPath={`/course/${course.slug}`}
                  teacherName={`${instructor.first_name} ${instructor.last_name}`}
                  teacherAvatar={instructor.avatar_url || person}
                  teacherLink={getTeacherPath(instructor.id)}
                  image={course.image || fallbackImage}
                  difficulty={course.level}
                  rating={course.rating}
                  studentsCount={course.participationCount}
                  status={course.status}
                  progress={course.progress}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default Instructor;
