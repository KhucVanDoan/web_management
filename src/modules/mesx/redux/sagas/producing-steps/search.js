import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchProducingStepsFailed,
  searchProducingStepsSuccess,
  SEARCH_PRODUCING_STEPS_START,
} from '~/modules/mesx/redux/actions/product-step'
import { api } from '~/services/api'

/**
 * Search producing step API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProducingStepsApi = (params) => {
  const uri = '/v1/produces/producing-steps/list'
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProducingSteps(action) {
  try {
    const response = yield call(searchProducingStepsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchProducingStepsSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchProducingStepsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search producing steps
 */
export default function* watchSearchProducingSteps() {
  yield takeLatest(SEARCH_PRODUCING_STEPS_START, doSearchProducingSteps)
}
