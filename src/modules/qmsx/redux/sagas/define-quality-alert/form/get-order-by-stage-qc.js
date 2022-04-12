import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getOrderByStageQcValueFail,
  getOrderByStageQcValueSuccess,
  GET_ORDER_BY_STAGE_QC_VALUES_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Get Order by StageQcValue  API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOrderByStageQcValueApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.endpointPatch}/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOrderByStageQcValue(action) {
  try {
    const response = yield call(getOrderByStageQcValueApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getOrderByStageQcValueSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getOrderByStageQcValueFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get Order by StageQcValue
 */
export default function* watchGetOrderByStageQcValue() {
  yield takeLatest(GET_ORDER_BY_STAGE_QC_VALUES_START, doGetOrderByStageQcValue)
}
