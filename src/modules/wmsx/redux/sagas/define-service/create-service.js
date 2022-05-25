import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createServiceSuccess,
  createServiceFailed,
  WMSX_CREATE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Create service api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/services/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateService(action) {
  try {
    const response = yield call(createServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createServiceSuccess(response.data))

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
    yield put(createServiceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateService() {
  yield takeLatest(WMSX_CREATE_SERVICE_START, doCreateService)
}
