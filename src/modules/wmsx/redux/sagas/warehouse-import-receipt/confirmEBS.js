import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseImportEBSByIdFailed,
  confirmWarehouseImportEBStByIdSuccess,
  CONFIRM_WAREHOUSE_IMPORT_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseImportEBSApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/sync/to-ebs`
  return api.put(uri)
}

function* doConfirmWarehouseImportEBS(action) {
  try {
    const response = yield call(confirmWarehouseImportEBSApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseImportEBStByIdSuccess(response.payload))

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
    yield put(confirmWarehouseImportEBSByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseImportEBS() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_IMPORT_EBS_START,
    doConfirmWarehouseImportEBS,
  )
}
