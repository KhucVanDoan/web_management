import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInventorySettingFailed,
  updateInventorySettingSuccess,
  UPDATE_INVENTORY_SETTING_START,
} from '~/modules/wmsx/redux/actions/inventory-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateInventorySettingApi = (body) => {
  const uri = `/v1/items/inventory-quantity-norms/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInventorySetting(action) {
  try {
    const response = yield call(updateInventorySettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInventorySettingSuccess(response.results))

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
    yield put(updateInventorySettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateInventorySetting() {
  yield takeLatest(UPDATE_INVENTORY_SETTING_START, doUpdateInventorySetting)
}
