import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  cancelWarehouseExportEBSByIdFailed,
  cancelWarehouseExportEBStByIdSuccess,
  CANCEL_WAREHOUSE_EXPORT_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const cancelWarehouseExportEBSApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/cancel-sync`
  return api.put(uri)
}

function* doCancelWarehouseExportEBS(action) {
  try {
    const response = yield call(cancelWarehouseExportEBSApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(cancelWarehouseExportEBStByIdSuccess(response.payload))

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
    yield put(cancelWarehouseExportEBSByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCancelWarehouseExportEBS() {
  yield takeLatest(
    CANCEL_WAREHOUSE_EXPORT_EBS_START,
    doCancelWarehouseExportEBS,
  )
}
