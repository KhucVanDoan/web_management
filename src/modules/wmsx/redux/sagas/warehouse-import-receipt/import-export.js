import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportWarehouseImportReceiptApi = (params) => {
  const uri = `____ENTER_IMPORT_IMPORT_URL_HERE____`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getWarehouseImportReceiptTemplateApi = () => {
  const uri = `____ENTER_IMPORT_IMPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importWarehouseImportReceiptApi,
  exportWarehouseImportReceiptApi,
  getWarehouseImportReceiptTemplateApi,
}
