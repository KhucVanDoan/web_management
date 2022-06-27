import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deletePalletFailed,
  deletePalletSuccess,
  WMSX_DELETE_PALLET_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Delete pallet api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deletePalletApi = (params) => {
  const uri = `/v1/items/pallets/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeletePallet(action) {
  try {
    const response = yield call(deletePalletApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deletePalletSuccess(response.results))

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

      yield put(deletePalletFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deletePalletFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeletePallet() {
  yield takeLatest(WMSX_DELETE_PALLET_START, doDeletePallet)
}
