import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getOutputMoFail,
  getOutputMoSuccess,
  GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Mo API: Lệnh sản xuất
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOutputMoApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/output-mos`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOutputMo(action) {
  try {
    const response = yield call(getOutputMoApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getOutputMoSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getOutputMoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get MO
 */
export default function* watchGetOutputMoForQcPlan() {
  yield takeLatest(GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START, doGetOutputMo)
}
