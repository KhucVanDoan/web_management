import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'

import { NOTIFICATION_TYPE } from 'common/constants'
import {
  confirmRoutingVersionByIdFailed,
  confirmRoutingVersionByIdSuccess,
  CONFIRM_ROUTING_VERSION_START,
} from 'modules/mesx/redux/actions/routing-version.action'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmRoutingVersionApi = (params) => {
  const uri = `/v1/produces/routing-versions/${params}/confirm`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmRoutingVersion(action) {
  try {
    const response = yield call(confirmRoutingVersionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmRoutingVersionByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'routingVersion.confirmRoutingVersionSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmRoutingVersionByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmRoutingVersion() {
  yield takeLatest(CONFIRM_ROUTING_VERSION_START, doConfirmRoutingVersion)
}
