import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  deleteJobDraftFail,
  deleteJobDraftSuccess,
  DELETE_JOB_DRAFT_START,
} from '../../actions/create-plan'
const apiUrl = (params) => {
  const url = `v1/mms/jobs/draft/${params}`
  return api.delete(url)
}

function* doDeleteJobDraft(action) {
  try {
    const response = yield call(apiUrl, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteJobDraftSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(deleteJobDraftFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteJobDraftFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteJobDraft() {
  yield takeLatest(DELETE_JOB_DRAFT_START, doDeleteJobDraft)
}
