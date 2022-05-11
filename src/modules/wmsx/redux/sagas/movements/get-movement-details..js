import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMovementsDetailsByIdFailed,
  getMovementsDetailsByIdSuccess,
  GET_MOVEMENT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/movements'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMovementsDetailsApi = (params) => {
  const uri = `/v1/warehouses/movements/${params}/mobile`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMovementsDetails(action) {
  try {
    const response = yield call(getMovementsDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMovementsDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMovementsDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMovementsDetails() {
  yield takeLatest(GET_MOVEMENT_DETAILS_START, doGetMovementsDetails)
}
