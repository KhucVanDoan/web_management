import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseSettingSuccess,
  searchWarehouseSettingFailed,
  SEARCH_WAREHOUSE_SETTING_START,
} from '~/modules/wmsx/redux/actions/warehouse-setting'
import { api } from '~/services/api'

/**
 * Search boq API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWarehouseSettingApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseSetting(action) {
  try {
    const response = yield call(searchWarehouseSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(searchWarehouseSettingSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BOQ
 */
export default function* watchSearchWarehouseSetting() {
  yield takeLatest(SEARCH_WAREHOUSE_SETTING_START, doSearchWarehouseSetting)
}
