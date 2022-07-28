import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchPlansFailed,
  searchPlansSuccess,
  SEARCH_PLANS_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'

/**
 * Search item API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchPlansApi = (params) => {
  const uri = `/v1/produces/plans/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPlans(action) {
  try {
    const response = yield call(searchPlansApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPlansSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchPlansFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search items
 */
export default function* watchSearchPlans() {
  yield takeLatest(SEARCH_PLANS_START, doSearchPlans)
}
