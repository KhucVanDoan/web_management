import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseExportProposalQuantityFailed,
  updateWarehouseExportProposalQuantitySuccess,
  UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseExportProposalQuantityApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params?.id}/export`
  return api.put(uri, params)
}

function* doUpdateWarehouseExportProposalQuantity(action) {
  try {
    const response = yield call(
      updateWarehouseExportProposalQuantityApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWarehouseExportProposalQuantitySuccess(response.results))

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
    yield put(updateWarehouseExportProposalQuantityFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseExportProposalQuantity() {
  yield takeLatest(
    UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_START,
    doUpdateWarehouseExportProposalQuantity,
  )
}
