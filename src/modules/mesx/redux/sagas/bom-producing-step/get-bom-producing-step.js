import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBomProducingStepFailed,
  getBomProducingStepSuccess,
  GET_BOM_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/bom-producing-step'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBomProducingStep(action) {
  try {
    const response = yield call(getBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBomProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBomProducingStep() {
  yield takeLatest(GET_BOM_PRODUCING_STEP_START, doGetBomProducingStep)
}
