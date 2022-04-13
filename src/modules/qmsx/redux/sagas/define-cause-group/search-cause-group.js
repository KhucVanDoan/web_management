import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCauseGroupFail,
  searchCauseGroupSuccess,
  SEARCH_CAUSE_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-cause-group'
import { api } from '~/services/api'

/**
 * Search cause group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchCauseGroupApi = (params) => {
  const uri = `/v1/quality-controls/cause-groups`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCauseGroup(action) {
  try {
    const response = yield call(searchCauseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchCauseGroupSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCauseGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch search cause group
 */
export default function* watchSearchCauseGroup() {
  yield takeLatest(SEARCH_CAUSE_GROUP_START, doSearchCauseGroup)
}
