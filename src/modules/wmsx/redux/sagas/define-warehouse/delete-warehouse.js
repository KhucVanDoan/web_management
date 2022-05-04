import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteWarehouseFailed,
  deleteWarehouseSuccess,
  WMSX_DELETE_WAREHOUSE_START,
} from '../../actions/define-warehouse'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteWarehouse(action) {
  try {
    const response = yield call(deleteWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseSuccess(response.results))

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
    yield put(deleteWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteWarehouse() {
  yield takeLatest(WMSX_DELETE_WAREHOUSE_START, doDeleteWarehouse)
}
