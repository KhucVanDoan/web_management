import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseSettingSuccess,
  updateWarehouseSettingFailed,
  UPDATE_WAREHOUSE_SETTING_START,
} from '~/modules/wmsx/redux/actions/warehouse-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseSettingApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseSetting(action) {
  try {
    const response = yield call(updateWarehouseSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseSettingSuccess(response.data))

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
    yield put(updateWarehouseSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateWarehouseSetting() {
  yield takeLatest(UPDATE_WAREHOUSE_SETTING_START, doUpdateWarehouseSetting)
}
