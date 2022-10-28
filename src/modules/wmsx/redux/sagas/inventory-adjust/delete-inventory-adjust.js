import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteInventoryAdjustFailed,
  deleteInventoryAdjustSuccess,
  DELETE_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteInventoryAdjustApi = () => {
  const uri = ``
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteInventoryAdjust(action) {
  try {
    const response = yield call(deleteInventoryAdjustApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteInventoryAdjustSuccess(response.data))

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
    yield put(deleteInventoryAdjustFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete warehouse area
 */
export default function* watchDeleteInventoryAdjust() {
  yield takeLatest(DELETE_INVENTORY_ADJUST_START, doDeleteInventoryAdjust)
}
