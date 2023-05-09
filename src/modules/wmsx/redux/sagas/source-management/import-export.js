import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportSourceManagementApi = (params) => {
  const uri = `/v1/sales/export?type=${CONST_EXPORT_MASTER_DATA.SOURCE}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getSourceManagementTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importSourceManagementApi,
  exportSourceManagementApi,
  getSourceManagementTemplateApi,
}
