import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailsFailed,
  getDetailsSuccess,
  GET_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'

/**
 * Search user API
 * @returns {Promise}
 */
export const getDetailsApi = () => {
  const uri = `/v1/items/item-details/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetails(action) {
  try {
    const response = yield call(getDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetails() {
  yield takeLatest(GET_DETAILS_START, doGetDetails)
}
