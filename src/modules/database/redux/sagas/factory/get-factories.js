import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getFactoriesFailed,
  getFactoriesSuccess,
  GET_FACTORIES_START,
} from '~/modules/database/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getFactoriesApi = () => {
  const uri = `/v1/users/factories/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetFactories(action) {
  try {
    const response = yield call(getFactoriesApi, action?.payload)

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
