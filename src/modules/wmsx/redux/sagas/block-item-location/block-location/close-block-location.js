import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  closeBlockLocationByIdFailed,
  closeBlockLocationByIdSuccess,
  CLOSE_BLOCK_LOCATION_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Close block location
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const closeBlockLocationApi = (params) => {
  const uri = `/v1/warehouses/suspends/${params}/close`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCloseBlockLocation(action) {
  try {
    const response = yield call(closeBlockLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(closeBlockLocationByIdSuccess(response.payload))

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
      yield put(closeBlockLocationByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(closeBlockLocationByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm invoice type
 */
export default function* watchCloseBlockLocation() {
  yield takeLatest(CLOSE_BLOCK_LOCATION_START, doCloseBlockLocation)
}
