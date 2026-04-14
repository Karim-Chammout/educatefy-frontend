import { AccountFragment, AccountRole } from '@/generated/graphql';

import { hasRichTextContent } from './hasRichTextContent';

export const hasMissingAccountData = (account: AccountFragment | null | undefined) => {
  if (
    account &&
    (!account.date_of_birth ||
      !account.gender ||
      !account.nickname ||
      !account.nationality ||
      !account.country ||
      (account.accountRole === AccountRole.Teacher &&
        (!account.subjects || !account.bio || !hasRichTextContent(account.description))))
  ) {
    return true;
  }

  return false;
};
