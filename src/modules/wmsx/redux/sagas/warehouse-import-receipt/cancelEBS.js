import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  cancelWarehouseImportEBSByIdFailed,
  cancelWarehouseImportEBStByIdSuccess,
  CANCEL_WAREHOUSE_IMPORT_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const cancelWarehouseImportEBSApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/cancel-sync`
  return api.put(uri)
}

function* doCancelWarehouseImportEBS(action) {
  try {
    const response = yield call(cancelWarehouseImportEBSApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(cancelWarehouseImportEBStByIdSuccess(response.payload))

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
    yield put(cancelWarehouseImportEBSByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCancelWarehouseImportEBS() {
  yield takeLatest(
    CANCEL_WAREHOUSE_IMPORT_EBS_START,
    doCancelWarehouseImportEBS,
  )
}
