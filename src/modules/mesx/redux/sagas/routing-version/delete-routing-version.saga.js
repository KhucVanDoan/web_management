import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  deleteRoutingVersionFailed,
  deleteRoutingVersionSuccess,
  DELETE_ROUTING_VERSION_START,
} from 'modules/mesx/redux/actions/routing-version.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteRoutingVersionApi = (params) => {
  const uri = `/v1/produces/routing-versions/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteRoutingVersion(action) {
  try {
    const response = yield call(deleteRoutingVersionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteRoutingVersionSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'routingVersion.deleteRoutingVersionSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteRoutingVersionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteRoutingVersion() {
  yield takeLatest(DELETE_ROUTING_VERSION_START, doDeleteRoutingVersion)
}
