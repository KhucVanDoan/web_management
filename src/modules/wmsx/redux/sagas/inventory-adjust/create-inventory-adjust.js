import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createInventoryAdjustFailed,
  createInventoryAdjustSuccess,
  CREATE_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createInventoryAdjustsApi = (params) => {
  const uri = `/v1/warehouses/inventory-adjustments/create`
  let form_data = new FormData()
  for (let key in params) {
    form_data.append(key, params[key])
  }
  return api.post(uri, form_data)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInventoryAdjust(action) {
  try {
    const response = yield call(createInventoryAdjustsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInventoryAdjustSuccess(response.data))

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
    yield put(createInventoryAdjustFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInventoryAdjust() {
  yield takeLatest(CREATE_INVENTORY_ADJUST_START, doCreateInventoryAdjust)
}
