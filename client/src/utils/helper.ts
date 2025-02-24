export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name: string) => {
  if (!name) return "";
  let initials = name[0].toUpperCase();
  return initials;
}

export const getPollBookmarked = (pollId: string, userBookmarks: string[] = []): boolean => {
  return userBookmarks.includes(pollId);
}