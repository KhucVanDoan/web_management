import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getFactoryDetailsByIdFailed,
  getFactoryDetailsByIdSuccess,
  GET_FACTORY_DETAILS_START,
} from '~/modules/database/redux/actions/factory'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getFactoryDetailsApi = (params) => {
  const uri = `/v1/users/factories/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetFactoryDetails(action) {
  try {
    const response = yield call(getFactoryDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getFactoryDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getFactoryDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetFactoryDetails() {
  yield takeLatest(GET_FACTORY_DETAILS_START, doGetFactoryDetails)
}
