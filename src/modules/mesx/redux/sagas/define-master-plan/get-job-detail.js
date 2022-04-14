import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getJobDetailsByIdFailed,
  getJobDetailsByIdSuccess,
  GET_JOB_DETAILS_START,
} from '~/modules/mesx/redux/actions/master-plan'
import { api } from '~/services/api'

/**
 * get master plan detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getJobDetailsApi = (params) => {
  const uri = `/v1/plans/master-plans/${params}/schedule`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetJobDetails(action) {
  try {
    const response = yield call(getJobDetailsApi, action?.payload)
    if (response?.data && response?.statusCode === 200) {
      yield put(getJobDetailsByIdSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getJobDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch get plan detail
 */
export default function* watchJobDetails() {
  yield takeLatest(GET_JOB_DETAILS_START, doGetJobDetails)
}
