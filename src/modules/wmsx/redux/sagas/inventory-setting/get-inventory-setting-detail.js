import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailInventorySettingByIdSuccess,
  getDetailInventorySettingByIdFailed,
  GET_INVENTORY_SETTING_START,
} from '~/modules/wmsx/redux/actions/inventory-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailApi = (params) => {
  const uri = `/v1/items/inventory-quantity-norms/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetail(action) {
  try {
    const response = yield call(getDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailInventorySettingByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailInventorySettingByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailInventorySetting() {
  yield takeLatest(GET_INVENTORY_SETTING_START, doGetDetail)
}
