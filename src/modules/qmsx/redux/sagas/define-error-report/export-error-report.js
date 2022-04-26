import { api } from '~/services/api'

const getExportErrorReportApi = (params) => {
  const uri = `/v1/quality-controls/error-reports/export-excel`
  return api.get(uri, params)
}

export default getExportErrorReportApi
