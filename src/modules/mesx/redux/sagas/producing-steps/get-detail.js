import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProducingStepDetailsByIdFailed,
  getProducingStepDetailsByIdSuccess,
  GET_PRODUCING_STEP_DETAILS_START,
} from '~/modules/mesx/redux/actions/product-step'
import { api } from '~/services/api'

/**
 * Search producing step API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProducingStepDetailsApi = (params) => {
  const uri = `/v1/produces/producing-steps/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingStepDetails(action) {
  try {
    const response = yield call(getProducingStepDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProducingStepDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProducingStepDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetProducingStepDetails() {
  yield takeLatest(GET_PRODUCING_STEP_DETAILS_START, doGetProducingStepDetails)
}
