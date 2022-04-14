import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getFactoriesFailed,
  getFactoriesSuccess,
  GET_FACTORIES_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getFactoriesApi = (params) => {
  const uri = `/v1/users/factories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetFactories(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }

    const response = yield call(getFactoriesApi, action.payload || payload)

    if (response?.statusCode === 200) {
      yield put(getFactoriesSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getFactoriesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetFactories() {
  yield takeLatest(GET_FACTORIES_START, doGetFactories)
}
