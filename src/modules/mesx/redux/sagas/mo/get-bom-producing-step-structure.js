import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBOMProducingStepStructureByIdFailed,
  getBOMProducingStepStructureByIdSuccess,
  GET_BOM_PRODUCING_STEP_STRUCTURE_START,
} from '~/modules/mesx/redux/actions/mo'
import { api } from '~/services/api'

/**
 * getBOMProducingStepStructureApi
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBOMProducingStepStructureApi = (params) => {
  let uri = `/v1/produces/manufacturing-orders/${params}/bom-producing-step-struct`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBOMProducingStepStructure(action) {
  try {
    const response = yield call(
      getBOMProducingStepStructureApi,
      action?.payload,
    )
    if (response?.data !== undefined) {
      yield put(getBOMProducingStepStructureByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBOMProducingStepStructureByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bom Structure
 */
export default function* watchGetBOMProducingStepStructure() {
  yield takeLatest(
    GET_BOM_PRODUCING_STEP_STRUCTURE_START,
    doGetBOMProducingStepStructure,
  )
}
