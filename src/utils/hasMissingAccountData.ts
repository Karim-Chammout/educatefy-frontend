import { AccountFragment, AccountRole } from '@/generated/graphql';

export const hasMissingAccountData = (account: AccountFragment | null | undefined) => {
  if (
    account &&
    (!account.date_of_birth ||
      !account.gender ||
      !account.nickname ||
      !account.nationality ||
      !account.country ||
      (account.accountRole === AccountRole.Teacher &&
        (!account.specialty || !account.subjects || !account.bio || !account.description)))
  ) {
    return true;
  }

  return false;
};
