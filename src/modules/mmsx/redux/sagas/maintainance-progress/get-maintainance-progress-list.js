import { call, put, takeLatest } from 'redux-saga/effects'

import {
  SEARCH_MAINTAINANCE_PROGRESS,
  searchMaintainanceProgressSuccess,
  searchMaintainanceProgressFail,
} from '~/modules/mmsx/redux/actions/maintainance-progress'
import { api } from '~/services/api'

const getReportProgressApi = (params) => {
  const url = `v1/mms/jobs/report`
  return api.get(url, params)
}

function* doGetReportProgress(action) {
  try {
    const response = yield call(getReportProgressApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchMaintainanceProgressSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMaintainanceProgressFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetReportProgress() {
  yield takeLatest(SEARCH_MAINTAINANCE_PROGRESS, doGetReportProgress)
}
