import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_PLAN_DETAIL_START,
  getDetailPlanFail,
  getDetailPlanSuccess,
} from '../../actions/create-plan'
const getJobDetail = (params) => {
  const url = `v1/mms/plan/${params}`
  return api.get(url)
}

function* doGetJobDetail(action) {
  try {
    const response = yield call(getJobDetail, action.payload)
    if (response.statusCode === 200) {
      yield put(getDetailPlanSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetPlanDetail() {
  yield takeLatest(GET_PLAN_DETAIL_START, doGetJobDetail)
}
