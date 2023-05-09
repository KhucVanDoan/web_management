import { CONST_EXPORT_MASTER_DATA } from '~/modules/wmsx/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importUomSettingApi = (params) => {
  const uri = `/v1/items/import-item-unit-setting`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportUomSettingApi = (params) => {
  const uri = `v1/items/export?type=${CONST_EXPORT_MASTER_DATA.UNIT}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getUomSettingTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importUomSettingApi,
  exportUomSettingApi,
  getUomSettingTemplateApi,
}
