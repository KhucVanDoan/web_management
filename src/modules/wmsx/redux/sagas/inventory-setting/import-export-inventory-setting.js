import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importInventorySettingApi = (params) => {
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
export const exportInventorySettingApi = (params) => {
  const uri = `/v1/items/inventory-quantity-norms/export`
  return api.get(uri, params, {
    responseType: 'blob',
    getHeaders: true,
  })
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getInventorySettingTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importInventorySettingApi,
  exportInventorySettingApi,
  getInventorySettingTemplateApi,
}
