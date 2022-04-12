import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMoListFail,
  getMoListSuccess,
  GET_MO_LIST_START,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Get env MO list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMoListApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-list-manufacturing-order`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMoList(action) {
  try {
    const response = yield call(getMoListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMoListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getMoListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get MO list
 */
export default function* watchGetMoList() {
  yield takeLatest(GET_MO_LIST_START, doGetMoList)
}
