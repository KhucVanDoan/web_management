import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePalletFailed,
  updatePalletSuccess,
  WMSX_UPDATE_PALLET_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Update pallet API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updatePalletApi = (params) => {
  const uri = `/v1/items/pallets/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePallet(action) {
  try {
    const response = yield call(updatePalletApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePalletSuccess(response.data))

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

      yield put(updatePalletFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updatePalletFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update pallet
 */
export default function* watchUpdatePallet() {
  yield takeLatest(WMSX_UPDATE_PALLET_START, doUpdatePallet)
}
