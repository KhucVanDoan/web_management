import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportWarehouseExportProposalApi = (params) => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getWarehouseExportProposalTemplateApi = () => {
  const uri = `/v1/warehouses/imports/templates/5`
  return api.get(uri)
}

export default {
  importWarehouseExportProposalApi,
  exportWarehouseExportProposalApi,
  getWarehouseExportProposalTemplateApi,
}
