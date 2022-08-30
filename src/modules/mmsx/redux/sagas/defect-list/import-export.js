import { TYPE_ENUM } from '~/modules/mmsx/constants'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importDefectListApi = (params) => {
  const uri = `v1/mms/import?type=${TYPE_ENUM.DEFECTS}`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportDefectListApi = (params) => {
  const uri = `v1/mms/export?type=${TYPE_ENUM.DEFECTS}`
  return api.get(uri, params)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDefectListTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importDefectListApi,
  exportDefectListApi,
  getDefectListTemplateApi,
}
