import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import { NOTIFICATION_TYPE } from 'common/constants'

import {
  createRoutingFailed,
  createRoutingSuccess,
  CREATE_ROUTING_START,
} from 'modules/mesx/redux/actions/routing.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createRoutingsApi = (params) => {
  const uri = `/v1/produces/routings/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateRouting(action) {
  try {
    const response = yield call(createRoutingsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createRoutingSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('routing.createRoutingSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createRoutingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateRouting() {
  yield takeLatest(CREATE_ROUTING_START, doCreateRouting)
}
