import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseSettingDetailsByIdSuccess,
  getWarehouseSettingDetailsByIdFailed,
  GET_WAREHOSE_SETTING_DETAIL_START,
} from '~/modules/wmsx/redux/actions/warehouse-setting'
import { api } from '~/services/api'

/**
 * Search BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseSettingDetailsApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseSettingDetails(action) {
  try {
    const response = yield call(getWarehouseSettingDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseSettingDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseSettingDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseSettingDetails() {
  yield takeLatest(
    GET_WAREHOSE_SETTING_DETAIL_START,
    doGetWarehouseSettingDetails,
  )
}
