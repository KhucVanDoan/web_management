import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getFactoriesFailed,
  getFactoriesSuccess,
  GET_FACTORIES_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getFactoriesApi = (params) => {
  const uri = `/v1/users/factories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetFactories(action) {
  try {
    const response = yield call(getFactoriesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getFactoriesSuccess(response.data.items))

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
 * Watch search Factories
 */
export default function* watchGetFactories() {
  yield takeLatest(GET_FACTORIES_START, doGetFactories)
}
