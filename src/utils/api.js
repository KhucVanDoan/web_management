const SUCCESS_STATUSES = [200, 201, 400]

export const validateStatus = (status) => {
  return SUCCESS_STATUSES.includes(status)
}

export const getFileNameFromHeader = (response) => {
  let filename = ''
  const contentDisposition = response?.header['content-disposition']
  if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(contentDisposition)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }
  return filename
}
