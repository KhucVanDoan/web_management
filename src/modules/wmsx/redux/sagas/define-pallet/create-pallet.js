import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPalletSuccess,
  createPalletFailed,
  WMSX_CREATE_PALLET_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Create pallet api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createPalletApi = (params) => {
  const uri = `/v1/items/pallets/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePallet(action) {
  try {
    const response = yield call(createPalletApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPalletSuccess(response.data))

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
      yield put(createPalletFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createPalletFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreatePallet() {
  yield takeLatest(WMSX_CREATE_PALLET_START, doCreatePallet)
}
