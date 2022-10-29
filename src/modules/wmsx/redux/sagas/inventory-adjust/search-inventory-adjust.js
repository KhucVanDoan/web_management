import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchInventoryAdjustFailed,
  searchInventoryAdjustSuccess,
  SEARCH_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse-transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryAdjustApi = (params) => {
  const uri = ``
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventoryAdjust(action) {
  try {
    const response = yield call(searchInventoryAdjustApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchInventoryAdjustSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInventoryAdjustFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search warehouse-transfers
 */
export default function* watchSearchInventoryAdjust() {
  yield takeLatest(SEARCH_INVENTORY_ADJUST_START, doSearchInventoryAdjust)
}
