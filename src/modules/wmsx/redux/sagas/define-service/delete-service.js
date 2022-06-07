import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteServiceFailed,
  deleteServiceSuccess,
  WMSX_DELETE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Delete service api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/services/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteService(action) {
  try {
    const response = yield call(deleteServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteServiceSuccess(response.results))

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
    yield put(deleteServiceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteService() {
  yield takeLatest(WMSX_DELETE_SERVICE_START, doDeleteService)
}
