import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseFailed,
  createWarehouseSuccess,
  CREATE_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseApi = (body) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/create`
  return api.post(uri, body)
}

function* doCreateWarehouse(action) {
  try {
    const response = yield call(createWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseSuccess(response.data))

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
    yield put(createWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouse() {
  yield takeLatest(CREATE_WAREHOUSE_START, doCreateWarehouse)
}
