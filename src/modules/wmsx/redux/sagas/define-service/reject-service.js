import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectServiceByIdFailed,
  rejectServiceByIdSuccess,
  WMSX_REJECT_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Reject service
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/services/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectService(action) {
  try {
    const response = yield call(rejectServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectServiceByIdSuccess(response.payload))

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
    yield put(rejectServiceByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectService() {
  yield takeLatest(WMSX_REJECT_SERVICE_START, doRejectService)
}
