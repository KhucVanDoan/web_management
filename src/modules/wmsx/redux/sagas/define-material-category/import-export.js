import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/import`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportMaterialCategoryApi = (params) => {
  const uri = `/v1/items/export?type=${CONST_EXPORT_MASTER_DATA.MATERIAL_CATEGORY}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getMaterialCategoryTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importMaterialCategoryApi,
  exportMaterialCategoryApi,
  getMaterialCategoryTemplateApi,
}
