/**
 * Scroll to bottom
 */
export const scrollToBottom = () => {
  window.scroll({
    top: document.body.offsetHeight,
    left: 0,
    behavior: 'smooth',
  });
};

/**
 * Scroll to top
 */
export const scrollToTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
