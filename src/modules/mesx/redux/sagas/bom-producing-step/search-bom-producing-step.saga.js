import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchBomProducingStepFailed,
  searchBomProducingStepSuccess,
  SEARCH_BOM_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/bom-producing-step.action'
import { api } from '~/services/api'

/**
 * Search BomProducingStep API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBomProducingStep(action) {
  try {
    const response = yield call(searchBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchBomProducingStepSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBomProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BomProducingStep
 */
export default function* watchSearchBomProducingStep() {
  yield takeLatest(SEARCH_BOM_PRODUCING_STEP_START, doSearchBomProducingStep)
}
