import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  updateInventoryLimitFailed,
  updateInventoryLimitSuccess,
  UPDATE_INVENTORY_LIMIT_START,
} from 'modules/mesx/redux/actions/inventory-limit.action'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateInventoryLimitApi = (body) => {
  const uri = `/v1/items/inventory-norms/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInventoryLimit(action) {
  try {
    const response = yield call(updateInventoryLimitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInventoryLimitSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())
      addNotification(
        'inventoryLimit.updateInventoryLimitSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateInventoryLimitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateInventoryLimit() {
  yield takeLatest(UPDATE_INVENTORY_LIMIT_START, doUpdateInventoryLimit)
}
