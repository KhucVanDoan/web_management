import { api } from '~/services/api'

const getExportQualityPointApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/export-excel`
  return api.get(uri, params)
}

export default getExportQualityPointApi
