import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ORDER_LIST_BY_STAGE_START,
  getOrderListByStageFail,
  getOrderListByStageSuccess
} from "~/modules/qmsx/redux/actions/quality-report";
import { api } from '~/services/api'

/**
 * Get order list by stage API
 * @stage {any} stage option to be sent
 * @returns {Promise}
 */
const getOrderListByStageApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/list-order/${params.stage}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOrderListByStage(action) {
  try {
    const response = yield call(getOrderListByStageApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getOrderListByStageSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getOrderListByStageFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get order list by stage
 */
export default function* watchGetOrderListByStage() {
  yield takeLatest(GET_ORDER_LIST_BY_STAGE_START, doGetOrderListByStage)
}
