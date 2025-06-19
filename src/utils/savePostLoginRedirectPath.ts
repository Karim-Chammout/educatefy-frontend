export const savePostLoginRedirectPath = (path: string): void => {
  sessionStorage.setItem('postLoginRedirect', path);
};
