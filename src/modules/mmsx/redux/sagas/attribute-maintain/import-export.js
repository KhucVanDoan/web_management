import { TYPE_ENUM } from '~/modules/mmsx/constants'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importAttributeMaintainApi = (params) => {
  const uri = `v1/mms/import?type=${TYPE_ENUM.MAINTENANCE_ATTRIBUTE}`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportAttributeMaintainApi = (params) => {
  const uri = `v1/mms/export?type=${TYPE_ENUM.MAINTENANCE_ATTRIBUTE}`
  return api.get(uri, params)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getAttributeMaintainTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importAttributeMaintainApi,
  exportAttributeMaintainApi,
  getAttributeMaintainTemplateApi,
}
