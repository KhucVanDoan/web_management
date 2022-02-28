import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMasterPlansFailed,
  searchMasterPlansSuccess,
  SEARCH_MASTER_PLANS_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'

/**
 * Search item API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchMasterPlansApi = (params) => {
  const uri = `/v1/plans/master-plans`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMasterPlans(action) {
  try {
    const response = yield call(searchMasterPlansApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.masterPlans,
        total: response.data.meta.total,
      }
      yield put(searchMasterPlansSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMasterPlansFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search items
 */
export default function* watchSearchMasterPlans() {
  yield takeLatest(SEARCH_MASTER_PLANS_START, doSearchMasterPlans)
}
