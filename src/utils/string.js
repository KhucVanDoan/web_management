export const generateRandomString = (length = 4) => {
  const randomString = Array(length).fill().map(() =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  ).join('')
  return `${randomString}${new Date().getTime()}`
}