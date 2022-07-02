import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchWarningListSuccess,
  searchWarningListFail,
  SEARCH_WARNING_LIST_START,
} from '../../actions/warning-system'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const searchWarningList = (params) => {
  const url = `v1/mms/jobs/list`
  return api.get(url, params)
}

function* doSearchWarningList(action) {
  try {
    const response = yield call(searchWarningList, action.payload)
    if (response.statusCode === 200) {
      yield put(searchWarningListSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(searchWarningListFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchWarningListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarningList() {
  yield takeLatest(SEARCH_WARNING_LIST_START, doSearchWarningList)
}
