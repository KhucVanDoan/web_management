import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportWarningSystemApi = (params) => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri, params)
}

export default {
  exportWarningSystemApi,
}
