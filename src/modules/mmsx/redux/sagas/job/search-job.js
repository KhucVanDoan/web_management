import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchJobListSuccess,
  searchJobListFail,
  SEARCH_JOB_LIST_START,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const searchJobList = (params) => {
  const url = `v1/mms/jobs/list`
  return api.get(url, params)
}

function* doSearchJobList(action) {
  try {
    const response = yield call(searchJobList, action.payload)
    if (response.statusCode === 200) {
      yield put(searchJobListSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(searchJobListFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchJobListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchJobList() {
  yield takeLatest(SEARCH_JOB_LIST_START, doSearchJobList)
}
