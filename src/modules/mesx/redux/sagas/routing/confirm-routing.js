import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmRoutingByIdFailed,
  confirmRoutingByIdSuccess,
  CONFIRM_ROUTING_START,
} from '~/modules/mesx/redux/actions/routing'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmRoutingApi = (params) => {
  const uri = `/v1/produces/routings/${params}/confirm`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmRouting(action) {
  try {
    const response = yield call(confirmRoutingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmRoutingByIdSuccess(response.payload))

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
    yield put(confirmRoutingByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmRouting() {
  yield takeLatest(CONFIRM_ROUTING_START, doConfirmRouting)
}
