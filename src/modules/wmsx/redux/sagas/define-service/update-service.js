import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateServiceFailed,
  updateServiceSuccess,
  WMSX_UPDATE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
/**
 * Update invoice API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/services/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateService(action) {
  try {
    const response = yield call(updateServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateServiceSuccess(response.data))

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
    yield put(updateServiceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update service
 */
export default function* watchUpdateService() {
  yield takeLatest(WMSX_UPDATE_SERVICE_START, doUpdateService)
}
