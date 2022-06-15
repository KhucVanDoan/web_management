import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInventoryCalendarFailed,
  updateInventoryCalendarSuccess,
  UPDATE_INVENTORY_CALENDAR_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateInventoryCalendarApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInventoryCalendar(action) {
  try {
    const response = yield call(updateInventoryCalendarApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInventoryCalendarSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateInventoryCalendarFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchUpdateInventoryCalendar() {
  yield takeLatest(UPDATE_INVENTORY_CALENDAR_START, doUpdateInventoryCalendar)
}
