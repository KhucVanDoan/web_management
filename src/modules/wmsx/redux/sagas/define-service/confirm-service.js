import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmServiceByIdFailed,
  confirmServiceByIdSuccess,
  WMSX_CONFIRM_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Confirm service
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/services/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmService(action) {
  try {
    const response = yield call(confirmServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmServiceByIdSuccess(response.payload))

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
    yield put(confirmServiceByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm service
 */
export default function* watchConfirmService() {
  yield takeLatest(WMSX_CONFIRM_SERVICE_START, doConfirmService)
}
