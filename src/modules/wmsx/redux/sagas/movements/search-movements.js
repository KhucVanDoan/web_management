import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMovementsFailed,
  searchMovementsSuccess,
  SEARCH_MOVEMENTS_START,
} from '~/modules/wmsx/redux/actions/movements'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchMovementsApi = (params) => {
  const uri = `/v1/warehouses/movements/list`
  return api.get(uri, params)
  // return res;
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMovements(action) {
  try {
    const response = yield call(searchMovementsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMovementsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMovementsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchMovements() {
  yield takeLatest(SEARCH_MOVEMENTS_START, doSearchMovements)
}
