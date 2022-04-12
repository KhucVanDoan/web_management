import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getOutputOrderByStageQcFail,
  getOutputOrderByStageQcSuccess,
  GET_OUTPUT_ORDER_BY_STAGE_QC_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Order API: Lệnh
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOutputOrderByStageQcApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/list-order/${params.stageQcValue}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOutputOrderByStageQc(action) {
  try {
    const response = yield call(getOutputOrderByStageQcApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getOutputOrderByStageQcSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getOutputOrderByStageQcFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get CommandCode
 */
export default function* watchGetOutputOrderByStageQc() {
  yield takeLatest(
    GET_OUTPUT_ORDER_BY_STAGE_QC_START,
    doGetOutputOrderByStageQc,
  )
}
