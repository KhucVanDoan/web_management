import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportCompanyApi = (params) => {
  const uri = `v1/users/export`
  return api.get(uri, params)
}

export default {
  exportCompanyApi,
}
