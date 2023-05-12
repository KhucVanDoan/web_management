import { CONST_EXPORT_LOCATION } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importLocationApi = (params) => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportLocationApi = (params) => {
  const uri = `v1/warehouse-layouts/export?type=${CONST_EXPORT_LOCATION.LOCTOR}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getLocationTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importLocationApi,
  exportLocationApi,
  getLocationTemplateApi,
}
