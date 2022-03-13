import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getModerationSuggestSpreadSuccess,
  getModerationSuggestSpreadFailed,
  GET_MODERATION_SUGGEST_SPREAD_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'

/**
 * get master plan detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getModerationSuggestSpreadApi = (params) => {
  const uri = `/v1/plans/master-plans/${params.masterPlanId}/moderations/suggest-spread`
  return api.get(uri, {
    itemProducingStepIds: params.itemProducingStepIds,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetModerationSuggestSpread(action) {
  try {
    const response = yield call(getModerationSuggestSpreadApi, action?.payload)
    if (response?.data) {
      yield put(getModerationSuggestSpreadSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getModerationSuggestSpreadFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get plan detail
 */
export default function* watchGetModerationSuggestSpread() {
  yield takeLatest(
    GET_MODERATION_SUGGEST_SPREAD_START,
    doGetModerationSuggestSpread,
  )
}
