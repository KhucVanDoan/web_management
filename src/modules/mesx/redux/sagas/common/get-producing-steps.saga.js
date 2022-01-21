import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getProducingStepsFailed,
  getProducingStepsSuccess,
  GET_PRODUCING_STEPS_START,
} from 'modules/mesx/redux/actions/common.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProducingStepsApi = (params) => {
  const uri = `/v1/produces/producing-steps/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingSteps(action) {
  try {
    const payload = {
      keyword: '',
      filter: JSON.stringify([{ column: 'status', text: '1' }]),
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getProducingStepsApi, payload)

    if (response?.statusCode === 200) {
      // filter type is product
      const data = response.data.items
      yield put(getProducingStepsSuccess(data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
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
 * Watch search users
 */
export default function* watchGetProducingSteps() {
  yield takeLatest(GET_PRODUCING_STEPS_START, doGetProducingSteps)
}
