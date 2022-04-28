import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailDetailsByIdFailed,
  getDetailDetailsByIdSuccess,
  GET_DETAIL_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailDetailsApi = (params) => {
  const uri = `/v1/items/item-details/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailDetails(action) {
  try {
    const response = yield call(getDetailDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailDetails() {
  yield takeLatest(GET_DETAIL_DETAILS_START, doGetDetailDetails)
}
