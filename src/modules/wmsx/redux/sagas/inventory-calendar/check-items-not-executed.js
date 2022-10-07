import { call, put, takeLatest } from 'redux-saga/effects'

import {
  checkItemNotExecutedFailed,
  checkItemNotExecutedSuccess,
  CHECK_ITEM_NOT_EXECUTED_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'

/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const checkItemNotExecutedApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/check-items-not-executed`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCheckItemNotExecuted(action) {
  try {
    const response = yield call(checkItemNotExecutedApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(checkItemNotExecutedSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(checkItemNotExecutedFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchCheckItemNotExecuted() {
  yield takeLatest(CHECK_ITEM_NOT_EXECUTED_START, doCheckItemNotExecuted)
}
