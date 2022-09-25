import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseExportProposaltDetailsByIdFailed,
  rejectWarehouseExportProposalByIdSuccess,
  REJECT_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params}/reject`
  return api.put(uri)
}

function* doRejectWarehouseExportProposal(action) {
  try {
    const response = yield call(
      rejectWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseExportProposalByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

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

export default function* watchRejectWarehouseExportProposal() {
  yield takeLatest(
    REJECT_WAREHOUSE_EXPORT_PROPOSAL_START,
    doRejectWarehouseExportProposal,
  )
}
