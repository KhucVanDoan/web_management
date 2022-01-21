import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getBomProducingStepBomDetailsFailed,
  getBomProducingStepBomDetailsSuccess,
  GET_BOM_PRODUCING_STEP_BOM_DETAILS_START,
} from 'modules/mesx/redux/actions/bom-producing-step.action'

/**
 * Search BomProducingStep API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBomProducingStepBomDetailsApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/${params.id}/status/${params.status}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBomProducingStepBomDetail(action) {
  try {
    const response = yield call(
      getBomProducingStepBomDetailApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getBomProducingStepBomDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomProducingStepBomDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BomProducingStep details
 */
export default function* watchGetBomProducingStepBomDetail() {
  yield takeLatest(
    GET_BOM_PRODUCING_STEP_DETAILS_START,
    doGetBomProducingStepBomDetail,
  )
}
