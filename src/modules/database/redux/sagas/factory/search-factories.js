import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchFactoriesFailed,
  searchFactoriesSuccess,
  SEARCH_FACTORIES_START,
} from '~/modules/database/redux/actions/factory'
import { api } from '~/services/api'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchFactoriesApi = (params) => {
  const uri = `/v1/users/factories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchFactories(action) {
  try {
    const response = yield call(searchFactoriesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchFactoriesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchFactoriesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchSearchFactories() {
  yield takeLatest(SEARCH_FACTORIES_START, doSearchFactories)
}
