import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getRoutingDetailsByIdFailed,
  getRoutingDetailsByIdSuccess,
  GET_ROUTING_DETAILS_START,
} from 'modules/mesx/redux/actions/routing.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoutingDetailsApi = (params) => {
  const uri = `/v1/produces/routings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoutingDetails(action) {
  try {
    const response = yield call(getRoutingDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getRoutingDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoutingDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoutingDetails() {
  yield takeLatest(GET_ROUTING_DETAILS_START, doGetRoutingDetails)
}
