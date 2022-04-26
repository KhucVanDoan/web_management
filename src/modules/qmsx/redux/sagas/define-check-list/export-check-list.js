import { api } from '~/services/api'

const getExportCheckListApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/export-excel`
  return api.get(uri, params)
}

export default getExportCheckListApi
