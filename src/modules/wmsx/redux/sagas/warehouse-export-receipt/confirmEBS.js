import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseExportEBSByIdFailed,
  confirmWarehouseExportEBStByIdSuccess,
  CONFIRM_WAREHOUSE_EXPORT_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseExportEBSApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/sync/to-ebs`
  return api.post(uri)
}

function* doConfirmWarehouseExportEBS(action) {
  try {
    const response = yield call(confirmWarehouseExportEBSApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseExportEBStByIdSuccess(response.payload))

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
    yield put(confirmWarehouseExportEBSByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseExportEBS() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_EXPORT_EBS_START,
    doConfirmWarehouseExportEBS,
  )
}
