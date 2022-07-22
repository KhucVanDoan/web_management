import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_GANTT_CHART_DATA,
  getGanttChartDataSuccess,
  getGanttChartDataFail,
} from '../../actions/create-plan'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const doCallApi = (params) => {
  const url = `v1/mms/plan/gantt-chart`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetPlanGanttChartData(action) {
  try {
    const response = yield call(doCallApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getGanttChartDataSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      yield put(getGanttChartDataFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getGanttChartDataFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchdoGetPlanGanttChartData() {
  yield takeLatest(GET_GANTT_CHART_DATA, doGetPlanGanttChartData)
}
