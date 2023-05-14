import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importDefineMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportDefineMaterialQualityApi = (params) => {
  const uri = `/v1/items/export?type=${CONST_EXPORT_MASTER_DATA.DEFINE_MATERIAL_QUALITY}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDefineMaterialQualityTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importDefineMaterialQualityApi,
  exportDefineMaterialQualityApi,
  getDefineMaterialQualityTemplateApi,
}
