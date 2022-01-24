import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBomDetailsByIdFailed,
  getBomDetailsByIdSuccess,
  GET_BOM_DETAILS_START,
} from '~/modules/mesx/redux/actions/work-order.action'
import { api } from '~/services/api'

/**
 * Search BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBomDetailsApi = (params) => {
  const uri = `/v1/produces/boms/get-by-item/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBomDetails(action) {
  try {
    const response = yield call(getBomDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBomDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBomDetails() {
  yield takeLatest(GET_BOM_DETAILS_START, doGetBomDetails)
}
