import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteInventoryCalendarFailed,
  deleteInventoryCalendarSuccess,
  DELETE_INVENTORY_CALENDAR_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteInventoryCalendarApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}`
  return api.delete(uri)
  // return {
  //   statusCode: 200,
  //   results: { API: 'DELETE_USER', id: 0, name: 'abada' },
  // };
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteInventoryCalendar(action) {
  try {
    const response = yield call(deleteInventoryCalendarApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteInventoryCalendarSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'inventoryCalendar.deleteInventoryCalendarSuccess',
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
    yield put(deleteInventoryCalendarFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteInventoryCalendar() {
  yield takeLatest(DELETE_INVENTORY_CALENDAR_START, doDeleteInventoryCalendar)
}
