import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveInventoryCalendarByIdFailed,
  approveInventoryCalendarByIdSuccess,
  APPROVE_INVENTORY_CALENDAR_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const approveInventoryCalendarApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/approve`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doApproveInventoryCalendar(action) {
  try {
    const response = yield call(approveInventoryCalendarApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveInventoryCalendarByIdSuccess(response.payload))

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
    yield put(approveInventoryCalendarByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchApproveInventoryCalendar() {
  yield takeLatest(APPROVE_INVENTORY_CALENDAR_START, doApproveInventoryCalendar)
}
