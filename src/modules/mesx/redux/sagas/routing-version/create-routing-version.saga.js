import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  createRoutingVersionFailed,
  createRoutingVersionSuccess,
  CREATE_ROUTING_VERSION_START,
} from 'modules/mesx/redux/actions/routing-version.action'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createRoutingVersionApi = (body) => {
  const uri = `/v1/produces/routing-versions/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateRoutingVersion(action) {
  try {
    const response = yield call(createRoutingVersionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createRoutingVersionSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'routingVersion.createRoutingVersionSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createRoutingVersionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateRoutingVersion() {
  yield takeLatest(CREATE_ROUTING_VERSION_START, doCreateRoutingVersion)
}
