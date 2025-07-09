// Utility for MCQ bookmarks
export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const getBookmarksKey = () => {
  const user = getUser();
  return user ? `mcqBookmarks_${user.email}` : 'mcqBookmarks_guest';
};

export const getBookmarkedMCQs = () => {
  const key = getBookmarksKey();
  return JSON.parse(localStorage.getItem(key) || '[]');
}; 