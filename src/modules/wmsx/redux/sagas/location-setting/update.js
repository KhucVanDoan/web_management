import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateLocationSettingFailed,
  updateLocationSettingSuccess,
  WMSX_UPDATE_LOCATION_SETTING_START,
} from '~/modules/wmsx/redux/actions/location-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateLocationSettingApi = (body) => {
  const uri = `/v1/warehouses/suggest-item-locations/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateLocationSetting(action) {
  try {
    const response = yield call(updateLocationSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateLocationSettingSuccess(response.data))

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
    yield put(updateLocationSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateLocationSetting() {
  yield takeLatest(WMSX_UPDATE_LOCATION_SETTING_START, doUpdateLocationSetting)
}