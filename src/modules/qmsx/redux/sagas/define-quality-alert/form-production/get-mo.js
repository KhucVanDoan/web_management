import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMoFail,
  getMoSuccess,
  GET_MO_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'

/**
 * get manufacturing-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-list-manufacturing-order`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMo(action) {
  try {
    const response = yield call(getMoApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getMoSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get Manufacturing-order
 */
export default function* watchGetMo() {
  yield takeLatest(GET_MO_START, doGetMo)
}
