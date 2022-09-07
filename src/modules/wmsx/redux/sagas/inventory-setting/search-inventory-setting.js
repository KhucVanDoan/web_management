import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchInventorySettingSuccess,
  searchInventorySettingFailed,
  SEARCH_INVENTORY_SETTING_START,
} from '~/modules/wmsx/redux/actions/inventory-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchApi = (params) => {
  const uri = `/v1/items/inventory-quantity-norms/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearch(action) {
  try {
    const response = yield call(searchApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchInventorySettingSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInventorySettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchInventorySetting() {
  yield takeLatest(SEARCH_INVENTORY_SETTING_START, doSearch)
}
