import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportItemTypeApi = (params) => {
  const uri = `v1/items/export`
  return api.get(uri, params)
}

export default {
  exportItemTypeApi,
}
