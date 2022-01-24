import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchItemUnitsFailed,
  searchItemUnitsSuccess,
  SEARCH_ITEM_UNITS_START,
} from '~/modules/mesx/redux/actions/item-unit-setting.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchItemUnitsApi = (params) => {
  const uri = `/v1/items/item-unit-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchItemUnits(action) {
  try {
    const response = yield call(searchItemUnitsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchItemUnitsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchItemUnitsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchItemUnits() {
  yield takeLatest(SEARCH_ITEM_UNITS_START, doSearchItemUnits)
}
