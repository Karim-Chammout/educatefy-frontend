import type { TFunction } from 'i18next';
import { describe, expect, it } from 'vitest';

import { NotificationCategory } from '@/generated/graphql';

import { notificationCategoryIcon, notificationIcon, notificationMessage } from '../notifications';

const t = ((key: string) => key) as unknown as TFunction<'translation', undefined>;

describe('notificationMessage', () => {
  it('translates the notification type with its payload', () => {
    const translate = ((key: string, params: Record<string, unknown>) =>
      `${key}:${JSON.stringify(params)}`) as unknown as TFunction<'translation', undefined>;

    expect(notificationMessage(translate, 'course_enrolled', { course: 'Math' })).toBe(
      'notification.type.course_enrolled:{"course":"Math"}',
    );
  });

  it('handles a missing payload', () => {
    expect(notificationMessage(t, 'welcome', null)).toBe('notification.type.welcome');
    expect(notificationMessage(t, 'welcome', undefined)).toBe('notification.type.welcome');
  });
});

describe('notificationIcon', () => {
  it('resolves icons for known types', () => {
    expect(notificationIcon('welcome')).toBeDefined();
    expect(notificationIcon('course_enrolled')).toBeDefined();
    expect(notificationIcon('new_follower')).toBeDefined();
  });

  it('falls back to the bell for unknown types', () => {
    expect(notificationIcon('unknown_type')).toBe(notificationIcon('another_unknown'));
  });
});

describe('notificationCategoryIcon', () => {
  it('resolves icons for every category', () => {
    Object.values(NotificationCategory).forEach((category) => {
      expect(notificationCategoryIcon(category)).toBeDefined();
    });
  });

  it('falls back to the bell for unknown categories', () => {
    expect(notificationCategoryIcon('unknown')).toBe(notificationIcon('unknown_type'));
  });
});
