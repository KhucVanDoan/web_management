import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBlockLocationFailed,
  createBlockLocationSuccess,
  CREATE_BLOCK_LOCATION_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBlockLocationsApi = (params) => {
  const uri = `/v1/warehouses/suspends/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBlockLocation(action) {
  try {
    const response = yield call(createBlockLocationsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBlockLocationSuccess(response.data))

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
      yield put(createBlockLocationFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createBlockLocationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create block location
 */
export default function* watchCreateBlockLocation() {
  yield takeLatest(CREATE_BLOCK_LOCATION_START, doCreateBlockLocation)
}
