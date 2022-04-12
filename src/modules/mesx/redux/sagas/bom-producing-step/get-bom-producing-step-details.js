import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBomProducingStepDetailsByIdFailed,
  getBomProducingStepDetailsByIdSuccess,
  GET_BOM_PRODUCING_STEP_DETAILS_START,
} from '~/modules/mesx/redux/actions/bom-producing-step'
import { api } from '~/services/api'

/**
 * Search BomProducingStep API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getBomProducingStepDetailsApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBomProducingStepDetails(action) {
  try {
    const response = yield call(getBomProducingStepDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBomProducingStepDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomProducingStepDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BomProducingStep details
 */
export default function* watchGetBomProducingStepDetails() {
  yield takeLatest(
    GET_BOM_PRODUCING_STEP_DETAILS_START,
    doGetBomProducingStepDetails,
  )
}
