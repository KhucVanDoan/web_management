import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  openBlockLocationByIdFailed,
  openBlockLocationByIdSuccess,
  OPEN_BLOCK_LOCATION_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Open block location
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const openBlockLocationApi = (params) => {
  const uri = `/v1/warehouses/suspends/${params}/open`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doOpenBlockLocation(action) {
  try {
    const response = yield call(openBlockLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(openBlockLocationByIdSuccess(response.payload))

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
      yield put(openBlockLocationByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(openBlockLocationByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm invoice type
 */
export default function* watchOpenBlockLocation() {
  yield takeLatest(OPEN_BLOCK_LOCATION_START, doOpenBlockLocation)
}
