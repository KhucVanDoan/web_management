import { TYPE_ENUM } from '~/modules/mmsx/constants'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importSuppliesCategoryApi = (params) => {
  const uri = `v1/mms/import?type=${TYPE_ENUM.SUPPLY_GROUP}`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportSuppliesCategoryApi = (params) => {
  const uri = `v1/mms/export?type=${TYPE_ENUM.SUPPLY_GROUP}`
  return api.get(uri, params)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getSuppliesCategoryTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importSuppliesCategoryApi,
  exportSuppliesCategoryApi,
  getSuppliesCategoryTemplateApi,
}
