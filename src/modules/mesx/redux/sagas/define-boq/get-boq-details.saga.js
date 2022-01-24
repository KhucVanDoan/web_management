import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBOQDetailsByIdFailed,
  getBOQDetailsByIdSuccess,
  GET_BOQ_DETAILS_START,
} from '~/modules/mesx/redux/actions/define-boq.action'
import { api } from '~/services/api'

/**
 * Search BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBOQDetailsApi = (params) => {
  const uri = `v1/produces/boqs/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBOQDetails(action) {
  try {
    const response = yield call(getBOQDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBOQDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBOQDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBOQDetails() {
  yield takeLatest(GET_BOQ_DETAILS_START, doGetBOQDetails)
}
