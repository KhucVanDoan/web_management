import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getResponsibleSubjectFailed,
  getResponsibleSubjectSuccess,
  GET_RESPONSIBLE_SUBJECT_START,
} from '../../actions/common'

/**
 * Get
 * @returns {Promise}
 */
const getResponsibleSubjectApi = (params) => {
  const uri = `v1/mms/maintenance-teams-and-users/list`
  if (params) {
    return api.get(uri, params)
  }
  return api.get(uri)
}

/*Worker */
function* doGetResponsibleSubject(action) {
  try {
    const response = yield call(getResponsibleSubjectApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getResponsibleSubjectSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getResponsibleSubjectFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/*Watcher */
export default function* watchGetResponsibleSubject() {
  yield takeLatest(GET_RESPONSIBLE_SUBJECT_START, doGetResponsibleSubject)
}
