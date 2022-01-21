import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  createInventoryLimitFailed,
  createInventoryLimitSuccess,
  CREATE_INVENTORY_LIMIT_START,
} from 'modules/mesx/redux/actions/inventory-limit.action'

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
      yield put(getAppStore())

      addNotification(
        'inventoryLimit.createInventoryLimitSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
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
  yield takeLatest(CREATE_INVENTORY_LIMIT_START, doCreateInventoryLimit)
}
