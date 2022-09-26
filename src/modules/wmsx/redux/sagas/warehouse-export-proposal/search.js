import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseExportProposalFailed,
  searchWarehouseExportProposalSuccess,
  SEARCH_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'

export const searchWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/list`
  return api.get(uri, params)
}

function* doSearchWarehouseExportProposal(action) {
  try {
    const response = yield call(
      searchWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseExportProposalSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseExportProposalFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarehouseExportProposal() {
  yield takeLatest(
    SEARCH_WAREHOUSE_EXPORT_PROPOSAL_START,
    doSearchWarehouseExportProposal,
  )
}
