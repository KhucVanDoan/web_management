import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_CREATE_PLAN_LIST,
  getCreatePlanListSuccess,
  getCreatePlanListFail,
} from '../../actions/create-plan'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getPlanList = (params) => {
  const url = `v1/mms/plan/list`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetPlanList(action) {
  try {
    const response = yield call(getPlanList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getCreatePlanListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCreatePlanListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetCreatePlanList() {
  yield takeLatest(GET_CREATE_PLAN_LIST, doGetPlanList)
}
