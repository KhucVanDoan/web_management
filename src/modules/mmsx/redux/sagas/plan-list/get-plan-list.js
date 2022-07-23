import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_PLAN_LIST,
  getPlanListSuccess,
  getPlanListFail,
} from '~/modules/mmsx/redux/actions/plan-list'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

export const getPlanListApi = (params) => {
  const url = `v1/mms/plan/list`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetPlanList(action) {
  try {
    const response = yield call(getPlanListApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getPlanListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPlanListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetPlanList() {
  yield takeLatest(GET_PLAN_LIST, doGetPlanList)
}
