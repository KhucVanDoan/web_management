import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmInventoryAdjustByIdFailed,
  confirmInventoryAdjustByIdSuccess,
  CONFIRM_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmInventoryAdjustApi = (params) => {
  const uri = `/v1/warehouses/inventory-adjustments/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmInventoryAdjust(action) {
  try {
    const response = yield call(confirmInventoryAdjustApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmInventoryAdjustByIdSuccess(response.payload))

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
    yield put(confirmInventoryAdjustByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmInventoryAdjust() {
  yield takeLatest(CONFIRM_INVENTORY_ADJUST_START, doConfirmInventoryAdjust)
}
