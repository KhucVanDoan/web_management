import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWorkCenterDetailsByIdFailed,
  getWorkCenterDetailsByIdSuccess,
  GET_WORK_CENTER_DETAILS_START,
} from '~/modules/mesx/redux/actions/work-center'
import { api } from '~/services/api'

/**
 * Get work center details API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWorkCenterDetailsApi = (params) => {
  const uri = `/v1/produces/work-centers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWorkCenterDetails(action) {
  try {
    const response = yield call(getWorkCenterDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWorkCenterDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWorkCenterDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WorkCenter details
 */
export default function* watchGetWorkCenterDetails() {
  yield takeLatest(GET_WORK_CENTER_DETAILS_START, doGetWorkCenterDetails)
}
