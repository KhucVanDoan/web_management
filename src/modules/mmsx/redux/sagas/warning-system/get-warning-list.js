import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_WARNING_LIST_START,
  getWarningListSuccess,
  getWarningListFail,
} from '../../actions/warning-system'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getWarningList = (params) => {
  const url = `v1/mms/warnings`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetWarningList(action) {
  try {
    const response = yield call(getWarningList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getWarningListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarningListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetWarningList() {
  yield takeLatest(GET_WARNING_LIST_START, doGetWarningList)
}
