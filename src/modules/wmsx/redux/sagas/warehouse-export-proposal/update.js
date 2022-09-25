import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseExportProposalFailed,
  updateWarehouseExportProposalSuccess,
  UPDATE_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateWarehouseExportProposal(action) {
  try {
    const response = yield call(
      updateWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWarehouseExportProposalSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWarehouseExportProposalFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseExportProposal() {
  yield takeLatest(
    UPDATE_WAREHOUSE_EXPORT_PROPOSAL_START,
    doUpdateWarehouseExportProposal,
  )
}
