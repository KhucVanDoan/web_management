import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateRoutingFailed,
  updateRoutingSuccess,
  UPDATE_ROUTING_START,
} from '~/modules/mesx/redux/actions/routing'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update routing API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateRoutingApi = (params) => {
  const uri = `/v1/produces/routings/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateRouting(action) {
  try {
    const response = yield call(updateRoutingApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateRoutingSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('routing.updateRoutingSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateRoutingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search routings
 */
export default function* watchUpdateRouting() {
  yield takeLatest(UPDATE_ROUTING_START, doUpdateRouting)
}
