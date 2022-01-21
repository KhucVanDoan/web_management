import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getRoutingsFailed,
  getRoutingsSuccess,
  GET_ROUTINGS_START,
} from 'modules/mesx/redux/actions/common.action'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoutingsApi = (params) => {
  const uri = `/v1/produces/routings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoutings(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getRoutingsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getRoutingsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoutingsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoutings() {
  yield takeLatest(GET_ROUTINGS_START, doGetRoutings)
}
