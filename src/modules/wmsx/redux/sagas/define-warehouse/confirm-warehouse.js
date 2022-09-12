import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseByIdFailed,
  confirmWarehouseByIdSuccess,
  CONFIRM_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params}/confirm`
  return api.put(uri)
}

function* doConfirmWarehouse(action) {
  try {
    const response = yield call(confirmWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseByIdSuccess(response.payload))

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
    yield put(confirmWarehouseByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouse() {
  yield takeLatest(CONFIRM_WAREHOUSE_START, doConfirmWarehouse)
}
