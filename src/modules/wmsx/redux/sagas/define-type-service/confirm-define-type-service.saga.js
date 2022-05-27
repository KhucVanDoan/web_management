import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmTypeServiceByIdFailed,
  confirmTypeServiceByIdSuccess,
  WMSX_CONFIRM_TYPE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-type-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmTypeServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/service-types/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmTypeService(action) {
  try {
    const response = yield call(confirmTypeServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmTypeServiceByIdSuccess(response.payload))

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
    yield put(confirmTypeServiceByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmTypeService() {
  yield takeLatest(WMSX_CONFIRM_TYPE_SERVICE_START, doConfirmTypeService)
}
