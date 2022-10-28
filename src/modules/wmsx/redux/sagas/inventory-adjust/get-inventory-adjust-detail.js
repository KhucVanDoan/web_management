import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getInventoryAdjustDetailsByIdFailed,
  getInventoryAdjustDetailsByIdSuccess,
  GET_INVENTORY_ADJUST_DETAILS_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInventoryAdjustDetailsApi = () => {
  const uri = ``
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInventoryAdjustDetails(action) {
  try {
    const response = yield call(getInventoryAdjustDetailsApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getInventoryAdjustDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInventoryAdjustDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetInventoryAdjustDetails() {
  yield takeLatest(
    GET_INVENTORY_ADJUST_DETAILS_START,
    doGetInventoryAdjustDetails,
  )
}
