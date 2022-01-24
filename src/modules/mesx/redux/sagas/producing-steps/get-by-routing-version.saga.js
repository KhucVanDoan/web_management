import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProducingStepsFailed,
  getProducingStepsSuccess,
  GET_BY_ROUTING_VERSION_START,
} from '~/modules/mesx/redux/actions/index.action'
import { api } from '~/services/api'

/**
 * Get producing step API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProducingStepsApi = (params) => {
  const uri = `/v1/produces/production-steps/get-by-routing-version/${params}`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingSteps(action) {
  try {
    const response = yield call(getProducingStepsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.producingSteps,
      }
      // Call callback action if provided
      yield put(getProducingStepsSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProducingStepsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get producing steps
 */
export default function* watchGetProducingStepsByRoutingVersion() {
  yield takeLatest(GET_BY_ROUTING_VERSION_START, doGetProducingSteps)
}
