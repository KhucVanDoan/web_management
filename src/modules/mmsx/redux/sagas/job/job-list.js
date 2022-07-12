import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_JOB_LIST_START,
  getJobListSuccess,
  getJobListFail,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getJobList = (params) => {
  const url = `v1/mms/jobs/list`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetJobList(action) {
  try {
    const response = yield call(getJobList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getJobListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getJobListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetJobList() {
  yield takeLatest(GET_JOB_LIST_START, doGetJobList)
}
