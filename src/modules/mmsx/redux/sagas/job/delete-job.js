import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteJobFail,
  deleteJobSuccess,
  DELETE_JOB_START,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteJobApi = (id) => {
  const url = `v1/mms/jobs/${id}`
  return api.delete(url)
}

function* doDeleteJob(action) {
  try {
    const response = yield call(deleteJobApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteJobSuccess({ id: action.payload }))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteJob() {
  yield takeLatest(DELETE_JOB_START, doDeleteJob)
}
