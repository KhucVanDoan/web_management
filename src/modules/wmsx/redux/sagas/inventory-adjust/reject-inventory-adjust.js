import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectInventoryAdjustByIdFailed,
  rejectInventoryAdjustByIdSuccess,
  REJECT_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectInventoryAdjustApi = (params) => {
  const uri = `/v1/warehouses/inventory-adjustments/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectInventoryAdjust(action) {
  try {
    const response = yield call(rejectInventoryAdjustApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectInventoryAdjustByIdSuccess(response.payload))

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
    yield put(rejectInventoryAdjustByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectInventoryAdjust() {
  yield takeLatest(REJECT_INVENTORY_ADJUST_START, doRejectInventoryAdjust)
}
