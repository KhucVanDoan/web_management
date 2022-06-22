import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createLocationSettingFailed,
  createLocationSettingSuccess,
  WMSX_CREATE_LOCATION_SETTING_START,
} from '~/modules/wmsx/redux/actions/location-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createLocationSettingApi = (body) => {
  const uri = `/v1/warehouses/suggest-item-locations/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateLocationSetting(action) {
  try {
    const response = yield call(createLocationSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createLocationSettingSuccess(response.data))

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
    yield put(createLocationSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateLocationSetting() {
  yield takeLatest(WMSX_CREATE_LOCATION_SETTING_START, doCreateLocationSetting)
}
