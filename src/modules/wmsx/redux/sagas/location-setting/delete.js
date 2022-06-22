import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteLocationSettingFailed,
  deleteLocationSettingSuccess,
  WMSX_DELETE_LOCATION_SETTING_START,
} from '~/modules/wmsx/redux/actions/location-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteLocationSettingApi = (params) => {
  const uri = `/v1/warehouses/suggest-item-locations/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteLocationSetting(action) {
  try {
    const response = yield call(deleteLocationSettingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteLocationSettingSuccess(response.results))

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
    yield put(deleteLocationSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteLocationSetting() {
  yield takeLatest(WMSX_DELETE_LOCATION_SETTING_START, doDeleteLocationSetting)
}
