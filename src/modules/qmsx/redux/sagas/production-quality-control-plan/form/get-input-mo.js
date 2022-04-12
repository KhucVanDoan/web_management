import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getInputMoFail,
  getInputMoSuccess,
  GET_INPUT_MO_PRODUCTION_QC_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Mo API: Lệnh sản xuất
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInputMoApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/input-mos`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInputMo(action) {
  try {
    const response = yield call(getInputMoApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInputMoSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInputMoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get MO
 */
export default function* watchGetInputMoForQcPlan() {
  yield takeLatest(GET_INPUT_MO_PRODUCTION_QC_PLAN_START, doGetInputMo)
}
