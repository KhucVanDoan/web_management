import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getLocationSettingDetailsByIdFailed,
  getLocationSettingDetailsByIdSuccess,
  WMSX_GET_LOCATION_SETTING_DETAILS_START,
} from '~/modules/wmsx/redux/actions/location-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getLocationSettingDetailsApi = (params) => {
  const uri = `/v1/warehouses/suggest-item-locations/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetLocationSettingDetails(action) {
  try {
    const response = yield call(getLocationSettingDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getLocationSettingDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getLocationSettingDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetLocationSettingDetails() {
  yield takeLatest(
    WMSX_GET_LOCATION_SETTING_DETAILS_START,
    doGetLocationSettingDetails,
  )
}
