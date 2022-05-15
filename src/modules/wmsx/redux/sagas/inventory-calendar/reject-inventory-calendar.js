import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectInventoryCalendarByIdFailed,
  rejectInventoryCalendarByIdSuccess,
  REJECT_INVENTORY_CALENDAR_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectInventoryCalendarApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/reject`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectInventoryCalendar(action) {
  try {
    const response = yield call(rejectInventoryCalendarApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectInventoryCalendarByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'inventoryCalendar.rejectInventoryCalendarSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectInventoryCalendarByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectInventoryCalendar() {
  yield takeLatest(REJECT_INVENTORY_CALENDAR_START, doRejectInventoryCalendar)
}
