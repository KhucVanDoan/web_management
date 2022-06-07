import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deletePackageFailed,
  deletePackageSuccess,
  DELETE_PACKAGE_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deletePackageApi = (params) => {
  const uri = `/v1/items/packages/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeletePackage(action) {
  try {
    const response = yield call(deletePackageApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deletePackageSuccess(response.results))

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
    yield put(deletePackageFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeletePackage() {
  yield takeLatest(DELETE_PACKAGE_START, doDeletePackage)
}
