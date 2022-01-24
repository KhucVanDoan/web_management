import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getInventoryLimitDetailsByIdFailed,
  getInventoryLimitDetailsByIdSuccess,
  GET_INVENTORY_LIMIT_DETAILS_START,
} from '~/modules/mesx/redux/actions/inventory-limit.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInventoryLimitDetailsApi = (params) => {
  const uri = `/v1/items/inventory-norms/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInventoryLimitDetails(action) {
  try {
    const response = yield call(getInventoryLimitDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInventoryLimitDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInventoryLimitDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetInventoryLimitDetails() {
  yield takeLatest(
    GET_INVENTORY_LIMIT_DETAILS_START,
    doGetInventoryLimitDetails,
  )
}
