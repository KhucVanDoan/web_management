import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchInventoryLimitsFailed,
  searchInventoryLimitsSuccess,
  SEARCH_INVENTORY_LIMITS_START,
} from 'modules/mesx/redux/actions/inventory-limit.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryLimitsApi = (params) => {
  const uri = `/v1/items/inventory-norms/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventoryLimits(action) {
  try {
    const response = yield call(searchInventoryLimitsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchInventoryLimitsSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInventoryLimitsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchInventoryLimits() {
  yield takeLatest(SEARCH_INVENTORY_LIMITS_START, doSearchInventoryLimits)
}
