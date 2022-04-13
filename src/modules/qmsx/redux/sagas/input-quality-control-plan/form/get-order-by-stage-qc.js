import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getInputOrderByStageQcFail,
  getInputOrderByStageQcSuccess,
  GET_INPUT_ORDER_BY_STAGE_QC_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Order API: Lệnh
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInputOrderByStageQcApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/list-order/${params.stageQcValue}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInputOrderByStageQc(action) {
  try {
    const response = yield call(getInputOrderByStageQcApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInputOrderByStageQcSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInputOrderByStageQcFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get CommandCode
 */
export default function* watchGetOrderByStageQc() {
  yield takeLatest(GET_INPUT_ORDER_BY_STAGE_QC_START, doGetInputOrderByStageQc)
}
