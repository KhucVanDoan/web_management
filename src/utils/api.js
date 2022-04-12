const SUCCESS_STATUSES = [200, 201, 400];

export const validateStatus = (status) => {
  return SUCCESS_STATUSES.includes(status);
};
