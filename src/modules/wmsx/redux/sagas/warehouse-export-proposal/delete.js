import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseExportProposalFailed,
  deleteWarehouseExportProposalSuccess,
  DELETE_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteWarehouseExportProposalApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params}`
  return api.delete(uri)
}

function* doDeleteWarehouseExportProposal(action) {
  try {
    const response = yield call(
      deleteWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseExportProposalSuccess(response.results))

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
    yield put(deleteWarehouseExportProposalFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteWarehouseExportProposal() {
  yield takeLatest(
    DELETE_WAREHOUSE_EXPORT_PROPOSAL_START,
    doDeleteWarehouseExportProposal,
  )
}
