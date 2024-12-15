export const removeHtmlTags = (str: string) => {
  return str.replace(/<[^>]*>/g, '');
};
