import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importContructionManagementApi = (params) => {
  const uri = `/v1/sales/constructions/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportContructionManagementApi = (params) => {
  const uri = `/v1/sales/export?type=${CONST_EXPORT_MASTER_DATA.CONTRUCTION}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getContructionManagementTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importContructionManagementApi,
  exportContructionManagementApi,
  getContructionManagementTemplateApi,
}
