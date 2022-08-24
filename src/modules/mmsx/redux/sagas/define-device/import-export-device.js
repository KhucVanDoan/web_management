import { TYPE_ENUM } from '~/modules/mmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importDeviceApi = (params) => {
  const uri = `/api/v1/mms/import?type=${TYPE_ENUM?.DEVICE}`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportDeviceApi = (params) => {
  const uri = `/api/v1/mms/export?type=${TYPE_ENUM?.DEVICE}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDeviceTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importDeviceApi,
  exportDeviceApi,
  getDeviceTemplateApi,
}
