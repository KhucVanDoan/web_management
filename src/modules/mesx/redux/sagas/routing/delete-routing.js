import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteRoutingFailed,
  deleteRoutingSuccess,
  DELETE_ROUTING_START,
} from '~/modules/mesx/redux/actions/routing'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteRoutingApi = (params) => {
  const uri = `/v1/produces/routings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteRouting(action) {
  try {
    const response = yield call(deleteRoutingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteRoutingSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('routing.deleteRoutingSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteRoutingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteRouting() {
  yield takeLatest(DELETE_ROUTING_START, doDeleteRouting)
}
