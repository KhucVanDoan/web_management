import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateWarehouseFailed,
  updateWarehouseSuccess,
  WMSX_UPDATE_WAREHOUSE_START,
} from '../../actions/define-warehouse'

/**
 * Search warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouse(action) {
  try {
    const response = yield call(updateWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseSuccess(response.data))

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

/**
 * Watch search warehouses
 */
export default function* watchUpdateWarehouse() {
  yield takeLatest(WMSX_UPDATE_WAREHOUSE_START, doUpdateWarehouse)
}
