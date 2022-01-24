import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getRoutingVersionDetailsByIdFailed,
  getRoutingVersionDetailsByIdSuccess,
  GET_ROUTING_VERSION_DETAILS_START,
} from '~/modules/mesx/redux/actions/routing-version.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoutingVersionDetailsApi = (params) => {
  const uri = `/v1/produces/routing-versions/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoutingVersionDetails(action) {
  try {
    const response = yield call(getRoutingVersionDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getRoutingVersionDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoutingVersionDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoutingVersionDetails() {
  yield takeLatest(
    GET_ROUTING_VERSION_DETAILS_START,
    doGetRoutingVersionDetails,
  )
}
