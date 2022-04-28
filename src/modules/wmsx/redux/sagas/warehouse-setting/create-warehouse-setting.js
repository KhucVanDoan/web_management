import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseSettingSuccess,
  createWarehouseSettingFailed,
  CREATE_WAREHOUSE_SETTING_START,
} from '~/modules/wmsx/redux/actions/warehouse-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createWarehousrSettingApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWarehouseSetting(action) {
  try {
    const response = yield call(createWarehousrSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseSettingSuccess(response.data))

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
    yield put(createWarehouseSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWarehouseSetting() {
  yield takeLatest(CREATE_WAREHOUSE_SETTING_START, doCreateWarehouseSetting)
}
