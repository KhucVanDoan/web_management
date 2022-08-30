import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_JOB_DRAFT_LIST,
  getJobDraftListSuccess,
  getJobDraftListFail,
} from '../../actions/create-plan'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getJobDraftList = (params) => {
  const url = `v1/mms/jobs/by-plan`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetJobDraftList(action) {
  try {
    const response = yield call(getJobDraftList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getJobDraftListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getJobDraftListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetJobDraftList() {
  yield takeLatest(GET_JOB_DRAFT_LIST, doGetJobDraftList)
}
