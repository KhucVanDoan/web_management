import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getProductionPlanByMoIdFail,
  getProductionPlanByMoIdSuccess,
  GET_PRODUCTION_PLAN_BY_MO_ID_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get production-plan (từ bên MESx) by moId API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductionPlanByMoIdApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/mos/${params?.moId}/confirmed-plans`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionPlanByMoId(action) {
  try {
    const response = yield call(getProductionPlanByMoIdApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductionPlanByMoIdSuccess(response?.data?.items))
      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data?.items)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductionPlanByMoIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production-plan by moId
 */
export default function* watchGetProductionPlanByMoId() {
  yield takeLatest(
    GET_PRODUCTION_PLAN_BY_MO_ID_START,
    doGetProductionPlanByMoId,
  )
}
