import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProducingStepDetailSuccess,
  getProducingStepDetailFailed,
  GET_PRODUCING_STEP_DETAIL_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'

/**
 * get producing step detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProducingStepDetailApi = (params) => {
  const uri = `/v1/plans/master-plans/${params.masterPlanId}/items-producing-step/detail`
  return api.get(uri, {
    itemProducingStepIds: params.itemProducingStepIds,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingStepDetail(action) {
  try {
    const response = yield call(getProducingStepDetailApi, action?.payload)
    if (response?.data) {
      yield put(getProducingStepDetailSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProducingStepDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get plan detail
 */
export default function* watchGetProducingStepDetail() {
  yield takeLatest(GET_PRODUCING_STEP_DETAIL_START, doGetProducingStepDetail)
}
