import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWorkCenterFailed,
  searchWorkCenterSuccess,
  SEARCH_WORK_CENTER_START,
} from '~/modules/mesx/redux/actions/work-center'
import { api } from '~/services/api'

/**
 * Search work center
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWorkCenterApi = (params) => {
  const uri = `/v1/produces/work-centers/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWorkCenter(action) {
  try {
    const response = yield call(searchWorkCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchWorkCenterSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWorkCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WorkCenter
 */
export default function* watchSearchWorkCenter() {
  yield takeLatest(SEARCH_WORK_CENTER_START, doSearchWorkCenter)
}
