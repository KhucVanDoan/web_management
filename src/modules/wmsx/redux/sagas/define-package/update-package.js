import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePackageFailed,
  updatePackageSuccess,
  UPDATE_PACKAGE_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updatePackageApi = (body) => {
  const uri = `/v1/items/packages/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePackage(action) {
  try {
    const response = yield call(updatePackageApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePackageSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updatePackageFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdatePackage() {
  yield takeLatest(UPDATE_PACKAGE_START, doUpdatePackage)
}
