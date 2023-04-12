import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  storedWarehouseFailed,
  storedWarehouseSuccess,
  STORED_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const storedWarehouseApi = (payload) => {
  const uri = `/v1/warehouses/import`
  return api.post(uri, payload)
}

function* doStoredWarehouse(action) {
  try {
    const response = yield call(storedWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(storedWarehouseSuccess(response.data))

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
    yield put(storedWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchStoredWarehouse() {
  yield takeLatest(STORED_START, doStoredWarehouse)
}
