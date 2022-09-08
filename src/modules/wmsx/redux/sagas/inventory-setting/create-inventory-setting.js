import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createInventorySettingFailed,
  createInventorySettingSuccess,
  CREATE_INVENTORY_SETTING_START,
} from '~/modules/wmsx/redux/actions/inventory-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createInventorySettingApi = (body) => {
  const uri = `v1/items/inventory-quantity-norms/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInventorySetting(action) {
  try {
    const response = yield call(createInventorySettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInventorySettingSuccess(response.data))

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
    yield put(createInventorySettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInventorySetting() {
  yield takeLatest(CREATE_INVENTORY_SETTING_START, doCreateInventorySetting)
}
