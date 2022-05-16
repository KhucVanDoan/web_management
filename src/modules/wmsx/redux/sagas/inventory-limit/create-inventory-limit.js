import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createInventoryLimitFailed,
  createInventoryLimitSuccess,
  WMSX_CREATE_INVENTORY_LIMIT_START,
} from '../../actions/inventory-limit'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createInventoryLimitApi = (body) => {
  const uri = `/v1/items/inventory-norms/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInventoryLimit(action) {
  try {
    const response = yield call(createInventoryLimitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInventoryLimitSuccess(response.data))

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
    yield put(createInventoryLimitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInventoryLimit() {
  yield takeLatest(WMSX_CREATE_INVENTORY_LIMIT_START, doCreateInventoryLimit)
}
