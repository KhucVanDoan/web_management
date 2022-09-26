import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseExportProposalFailed,
  createWarehouseExportProposalSuccess,
  CREATE_WAREHOUSE_EXPORT_PROPOSAL_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseExportProposalApi = (body) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/create`
  return api.post(uri, body)
}

function* doCreateWarehouseExportProposal(action) {
  try {
    const response = yield call(
      createWarehouseExportProposalApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createWarehouseExportProposalSuccess(response.data))

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
    yield put(createWarehouseExportProposalFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouseExportProposal() {
  yield takeLatest(
    CREATE_WAREHOUSE_EXPORT_PROPOSAL_START,
    doCreateWarehouseExportProposal,
  )
}
