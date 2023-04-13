import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  receiveWarehouseFailed,
  receiveWarehouseSuccess,
  RECEIVE_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const receiveWarehouseApi = (payload) => {
  const uri = `/v1/sales/purchased-order-imports/receive/create`
  return api.post(uri, payload)
}

function* doReceiveWarehouse(action) {
  try {
    const response = yield call(receiveWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(receiveWarehouseSuccess(response.data))

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
    yield put(receiveWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchReceiveWarehouse() {
  yield takeLatest(RECEIVE_START, doReceiveWarehouse)
}
