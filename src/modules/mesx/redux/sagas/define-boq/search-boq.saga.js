import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchBOQFailed,
  searchBOQSuccess,
  SEARCH_BOQ_START,
} from '~/modules/mesx/redux/actions/define-boq'
import { api } from '~/services/api'

/**
 * Search boq API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBOQApi = (params) => {
  const uri = `/v1/produces/boqs/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBOQ(action) {
  try {
    const response = yield call(searchBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchBOQSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBOQFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BOQ
 */
export default function* watchSearchBOQ() {
  yield takeLatest(SEARCH_BOQ_START, doSearchBOQ)
}
