import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchInventoryCalendarsFailed,
  searchInventoryCalendarsSuccess,
  SEARCH_INVENTORY_CALENDARS_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'

/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryCalendarsApi = (params) => {
  const uri = `/v1/warehouses/inventories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventoryCalendars(action) {
  try {
    const response = yield call(searchInventoryCalendarsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchInventoryCalendarsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInventoryCalendarsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchSearchInventoryCalendars() {
  yield takeLatest(SEARCH_INVENTORY_CALENDARS_START, doSearchInventoryCalendars)
}
