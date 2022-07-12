import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_JOB_DETAIL_START,
  getJobDetailSuccess,
  getJobDetailFail,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'

const getJobDetail = (params, isDraft) => {
  let url = `v1/mms/jobs/${params}`
  if (isDraft === 1) {
    url = `v1/mms/jobs/${params}?isDraft=1`
  }
  return api.get(url)
}

function* doGetJobDetail(action) {
  try {
    const response = yield call(
      getJobDetail,
      action.payload.id,
      action.payload.isDraft,
    )
    if (response.statusCode === 200) {
      yield put(getJobDetailSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getJobDetailFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetjobDetail() {
  yield takeLatest(GET_JOB_DETAIL_START, doGetJobDetail)
}
