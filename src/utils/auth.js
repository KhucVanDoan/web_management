/**
 * Check user is logged in
 * @returns {boolean}
 */
export const isAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
