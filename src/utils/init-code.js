import { CODE_SETTINGS } from 'common/constants'

/**
 *
 * @param {string} domainName
 * @returns {string}
 */
export const initCode = (domainName) => {
  const domain = CODE_SETTINGS[domainName]
  let newCode = domain.PREFIX
  while (newCode.length < domain.MAX_LENGTH) {
    newCode += domain.FILLED_CHARACTER
  }
  return newCode
}
