import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchMOSuccess,
  searchMOFailed,
  SEARCH_MO_START,
} from 'modules/mesx/redux/actions/mo.action'

/**
 * Search Mo API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchMOApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMO(action) {
  try {
    const response = yield call(searchMOApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchMOSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMOFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search Mo
 */
export default function* watchSearchMO() {
  yield takeLatest(SEARCH_MO_START, doSearchMO)
}
