import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProducingStepByRoutingFail,
  getProducingStepByRoutingSuccess,
  GET_PRODUCING_STEP_BY_ROUTING_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'

/**
 * get producing-step by routing-id API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProducingStepByRoutingApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-get-producing-step-by-routing-id/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingStepByRouting(action) {
  try {
    const response = yield call(getProducingStepByRoutingApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getProducingStepByRoutingSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProducingStepByRoutingFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get
 */
export default function* watchGetProducingStepByRouting() {
  yield takeLatest(
    GET_PRODUCING_STEP_BY_ROUTING_START,
    doGetProducingStepByRouting,
  )
}
