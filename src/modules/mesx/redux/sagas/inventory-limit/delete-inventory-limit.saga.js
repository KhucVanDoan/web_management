import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  deleteInventoryLimitFailed,
  deleteInventoryLimitSuccess,
  DELETE_INVENTORY_LIMIT_START,
} from '~/modules/mesx/redux/actions/inventory-limit.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteInventoryLimitApi = (params) => {
  const uri = `/v1/items/inventory-norms/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteInventoryLimit(action) {
  try {
    const response = yield call(deleteInventoryLimitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteInventoryLimitSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'inventoryLimit.deleteInventoryLimitSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteInventoryLimitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteInventoryLimit() {
  yield takeLatest(DELETE_INVENTORY_LIMIT_START, doDeleteInventoryLimit)
}
