import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseSettingSuccess,
  deleteWarehouseSettingFailed,
  DELETE_WAREHOUSE_SETTING_START,
} from '~/modules/wmsx/redux/actions/warehouse-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteWarehouseSettingApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteWarehouseSetting(action) {
  try {
    const response = yield call(deleteWarehouseSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseSettingSuccess(response.data))

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
    yield put(deleteWarehouseSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteWarehouseSetting() {
  yield takeLatest(DELETE_WAREHOUSE_SETTING_START, doDeleteWarehouseSetting)
}
