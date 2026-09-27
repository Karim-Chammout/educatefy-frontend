import { useApolloClient, useMutation } from '@apollo/client/react';
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
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { FollowTeacherDocument, TeacherFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { RichTextContent, TopContentCard, TopContentCardItem } from '@/ui/compositions';
import { applyFollowTeacherResult } from '@/utils/followTeacherCache';
import { hasRichTextContent } from '@/utils/hasRichTextContent';
import {
  darkModeHostileBrands,
  getSocialLinkText,
  getSocialPlatformIcon,
  socialPlatformBrandColors,
} from '@/utils/socialPlatform';

import { ContentTypeFilter } from './types';
import {
  BioText,
  ContentFilter,
  ContentHeader,
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

type InstructorProps = {
  instructor: TeacherFragment;
  contentItems: TopContentCardItem[];
  contentTotalCount: number;
  contentType: ContentTypeFilter;
  onContentTypeChange: (contentType: ContentTypeFilter) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const Instructor = ({
  instructor,
  contentItems,
  contentTotalCount,
  contentType,
  onContentTypeChange,
  currentPage,
  pageCount,
  onPageChange,
}: InstructorProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const client = useApolloClient();
  const [followTeacher, { loading: updatingFollow }] = useMutation(FollowTeacherDocument);

  const handleFollowTeacher = async () => {
    const { data } = await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: instructor.id,
        },
      },
    });

    applyFollowTeacherResult(client, instructor.id, data?.followTeacher);
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

  const emptyStateLabels: Record<ContentTypeFilter, string> = {
    all: t('instructor.noPublishedContent'),
    course: t('instructor.noPublishedCourses'),
    program: t('instructor.noPublishedPrograms'),
  };
  const emptyStateLabel = emptyStateLabels[contentType];

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

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <ContentHeader>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              {t('instructor.contentBy', {
                name: instructor.first_name,
              })}
            </Typography>

            {contentTotalCount > 0 && (
              <Typography variant="body2" color="text.secondary">
                {t('instructor.contentCount', { count: contentTotalCount })}
              </Typography>
            )}
          </Box>

          <ContentFilter
            value={contentType}
            exclusive
            onChange={(_, value: ContentTypeFilter | null) => {
              if (value) {
                onContentTypeChange(value);
              }
            }}
            size="small"
            aria-label={t('instructor.contentFilterLabel')}
          >
            <ToggleButton value="all">{t('instructor.contentFilterAll')}</ToggleButton>
            <ToggleButton value="course">{t('instructor.contentFilterCourses')}</ToggleButton>
            <ToggleButton value="program">{t('instructor.contentFilterPrograms')}</ToggleButton>
          </ContentFilter>
        </ContentHeader>

        {contentItems.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            {emptyStateLabel}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {contentItems.map((item) => (
              <Grid
                key={`${item.__typename}-${item.id}`}
                size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <TopContentCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}

        {pageCount > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <Pagination
              color="primary"
              page={currentPage}
              count={pageCount}
              onChange={(_, value) => onPageChange(value)}
            />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Instructor;
