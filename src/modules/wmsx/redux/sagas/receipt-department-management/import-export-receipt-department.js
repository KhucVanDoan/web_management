import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/export?type=${CONST_EXPORT_MASTER_DATA.DEPARTMENT_RECEIPT}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getReceiptDepartmentTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importReceiptDepartmentApi,
  exportReceiptDepartmentApi,
  getReceiptDepartmentTemplateApi,
}
