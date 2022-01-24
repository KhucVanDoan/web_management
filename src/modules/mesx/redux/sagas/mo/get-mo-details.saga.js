import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMODetailsByIdFailed,
  getMODetailsByIdSuccess,
  GET_MO_DETAILS_START,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'

/**
 * Search MO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMODetailsApi = (params) => {
  const uri = `v1/produces/manufacturing-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMODetails(action) {
  try {
    const response = yield call(getMODetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMODetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMODetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMODetails() {
  yield takeLatest(GET_MO_DETAILS_START, doGetMODetails)
}
