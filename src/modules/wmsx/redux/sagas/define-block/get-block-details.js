import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBlockDetailsByIdFailed,
  getBlockDetailsByIdSuccess,
  GET_BLOCK_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBlockDetailsApi = (params) => {
  const uri = `/v1/items/blocks/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBlockDetails(action) {
  try {
    const response = yield call(getBlockDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBlockDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBlockDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBlockDetails() {
  yield takeLatest(GET_BLOCK_DETAILS_START, doGetBlockDetails)
}
