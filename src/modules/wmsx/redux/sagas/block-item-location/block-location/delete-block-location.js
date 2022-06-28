import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteBlockLocationFailed,
  deleteBlockLocationSuccess,
  DELETE_BLOCK_LOCATION_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete block location API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBlockLocationApi = (params) => {
  const uri = `/v1/warehouses/suspends/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBlockLocation(action) {
  try {
    const response = yield call(deleteBlockLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBlockLocationSuccess(response.results))

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
      yield put(deleteBlockLocationFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteBlockLocationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBlockLocation() {
  yield takeLatest(DELETE_BLOCK_LOCATION_START, doDeleteBlockLocation)
}
