import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseExportProposaltDetailsByIdFailed,
  getWarehouseExportProposaltDetailsByIdSuccess,
  GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'

export const getWarehouseExportProposalDetailsApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params}`
  return api.get(uri)
}
export const getLotNumberItem = (params) => {
  const uri = `/v1/items/${params}/lots`
  return api.get(uri)
}
function* doGetWarehouseExportProposalDetails(action) {
  try {
    const response = yield call(
      getWarehouseExportProposalDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getWarehouseExportProposaltDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseExportProposaltDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseExportProposalDetails() {
  yield takeLatest(
    GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_START,
    doGetWarehouseExportProposalDetails,
  )
}
