import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getInventoryCalendarDetailsByIdFailed,
  getInventoryCalendarDetailsByIdSuccess,
  GET_INVENTORY_CALENDAR_DETAILS_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInventoryCalendarDetailsApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInventoryCalendarDetails(action) {
  try {
    const response = yield call(getInventoryCalendarDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInventoryCalendarDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInventoryCalendarDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetInventoryCalendarDetails() {
  yield takeLatest(
    GET_INVENTORY_CALENDAR_DETAILS_START,
    doGetInventoryCalendarDetails,
  )
}
