import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPackageFailed,
  createPackageSuccess,
  CREATE_PACKAGE_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createPackageApi = (body) => {
  const uri = `/v1/items/packages/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePackage(action) {
  try {
    const response = yield call(createPackageApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPackageSuccess(response.data))

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
    yield put(createPackageFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreatePackage() {
  yield takeLatest(CREATE_PACKAGE_START, doCreatePackage)
}
