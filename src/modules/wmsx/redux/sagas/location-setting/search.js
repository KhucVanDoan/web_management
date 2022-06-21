import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchLocationSettingFailed,
  searchLocationSettingSuccess,
  WMSX_SEARCH_LOCATION_SETTING_START,
} from '~/modules/wmsx/redux/actions/location-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchLocationSettingsApi = (params) => {
  // @TODO:phunv: api link
  const uri = `/v1/warehouses/suggest-item-locations/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchLocationSettings(action) {
  try {
    const response = yield call(searchLocationSettingsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchLocationSettingSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchLocationSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchLocationSettings() {
  yield takeLatest(WMSX_SEARCH_LOCATION_SETTING_START, doSearchLocationSettings)
}
