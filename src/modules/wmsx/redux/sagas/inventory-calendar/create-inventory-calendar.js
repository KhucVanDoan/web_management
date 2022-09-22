import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createInventoryCalendarFailed,
  createInventoryCalendarSuccess,
  CREATE_INVENTORY_CALENDAR_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const createInventoryCalendarsApi = (params) => {
  let form_data = new FormData()
  for (let key in params) {
    form_data.append(key, params[key])
  }
  const uri = `/v1/warehouses/inventories/create`
  return api.postMultiplePart(uri, form_data)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInventoryCalendar(action) {
  try {
    const response = yield call(createInventoryCalendarsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInventoryCalendarSuccess(response.data))

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
    yield put(createInventoryCalendarFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInventoryCalendar() {
  yield takeLatest(CREATE_INVENTORY_CALENDAR_START, doCreateInventoryCalendar)
}
