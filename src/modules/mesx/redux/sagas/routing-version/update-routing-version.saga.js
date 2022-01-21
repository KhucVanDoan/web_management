import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  updateRoutingVersionFailed,
  updateRoutingVersionSuccess,
  UPDATE_ROUTING_VERSION_START,
} from 'modules/mesx/redux/actions/routing-version.action'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateRoutingVersionApi = (body) => {
  const uri = `/v1/produces/routing-versions/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateRoutingVersion(action) {
  try {
    const response = yield call(updateRoutingVersionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateRoutingVersionSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())
      addNotification(
        'routingVersion.updateRoutingVersionSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateRoutingVersionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateRoutingVersion() {
  yield takeLatest(UPDATE_ROUTING_VERSION_START, doUpdateRoutingVersion)
}
