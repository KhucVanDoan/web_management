import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmPackageByIdFailed,
  confirmPackageByIdSuccess,
  CONFIRM_PACKAGE_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmPackageApi = (params) => {
  const uri = `/v1/items/packages/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmPackage(action) {
  try {
    const response = yield call(confirmPackageApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmPackageByIdSuccess(response.payload))

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
    yield put(confirmPackageByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmPackage() {
  yield takeLatest(CONFIRM_PACKAGE_START, doConfirmPackage)
}
