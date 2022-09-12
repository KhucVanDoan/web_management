import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseFailed,
  updateWarehouseSuccess,
  UPDATE_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateWarehouse(action) {
  try {
    const response = yield call(updateWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseSuccess(response.results))

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
    yield put(updateWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouse() {
  yield takeLatest(UPDATE_WAREHOUSE_START, doUpdateWarehouse)
}
