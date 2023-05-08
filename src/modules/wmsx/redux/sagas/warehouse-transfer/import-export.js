import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importWarehouseTransferImportApi = (params) => {
  const uri = `/v1/warehouses/transfers/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportWarehouseTransferImportApi = (params) => {
  const uri = ``
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getWarehouseTransferImportTemplateApi = () => {
  const uri = `____ENTER_IMPORT_IMPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importWarehouseTransferImportApi,
  exportWarehouseTransferImportApi,
  getWarehouseTransferImportTemplateApi,
}
