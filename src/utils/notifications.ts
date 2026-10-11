import BadgeIcon from '@mui/icons-material/Badge';
import CampaignIcon from '@mui/icons-material/Campaign';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { SvgIconComponent } from '@mui/icons-material';
import { TFunction } from 'i18next';

import { NotificationCategory } from '@/generated/graphql';

const TYPE_ICONS: Record<string, SvgIconComponent> = {
  welcome: CampaignIcon,
  course_enrolled: PersonAddIcon,
  program_enrolled: SchoolIcon,
  course_rated: StarIcon,
  new_follower: GroupAddIcon,
  course_completed: TaskAltIcon,
  course_completed_by_student: CheckCircleIcon,
  program_version_published: RocketLaunchIcon,
};

const CATEGORY_ICONS: Record<string, SvgIconComponent> = {
  [NotificationCategory.Account]: BadgeIcon,
  [NotificationCategory.Learning]: SchoolIcon,
  [NotificationCategory.Teaching]: CastForEducationIcon,
  [NotificationCategory.Social]: GroupIcon,
};

/**
 * Renders a notification row from the raw payload.
 */
export const notificationMessage = (
  t: TFunction<'translation', undefined>,
  type: string,
  payload: Record<string, unknown> | null | undefined,
): string => t(`notification.type.${type}`, payload ?? {}) as string;

/** Leading icon of a notification row. Unknown types fall back to the bell. */
export const notificationIcon = (type: string): SvgIconComponent =>
  TYPE_ICONS[type] ?? NotificationsIcon;

/** Leading icon of a notification category chip. Unknown categories fall back to the bell. */
export const notificationCategoryIcon = (category: string): SvgIconComponent =>
  CATEGORY_ICONS[category] ?? NotificationsIcon;
