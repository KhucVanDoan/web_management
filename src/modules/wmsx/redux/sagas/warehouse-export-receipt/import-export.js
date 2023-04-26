import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importWarehouseExportReceiptApi = (params) => {
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
export const exportWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/export?type=${CONST_EXPORT_MASTER_DATA.WAREHOUSE_EXPORT_RECEIPT}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getWarehouseExportReceiptTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importWarehouseExportReceiptApi,
  exportWarehouseExportReceiptApi,
  getWarehouseExportReceiptTemplateApi,
}
