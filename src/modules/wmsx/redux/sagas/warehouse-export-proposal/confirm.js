import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseExportProposalByIdFailed,
  confirmWarehouseExportProposalByIdSuccess,
  CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params}/confirm`
  return api.put(uri)
}

function* doConfirmWarehouseExportProposal(action) {
  try {
    const response = yield call(
      confirmWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseExportProposalByIdSuccess(response.payload))

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
    yield put(confirmWarehouseExportProposalByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseExportProposal() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_START,
    doConfirmWarehouseExportProposal,
  )
}