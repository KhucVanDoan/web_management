import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailReasonManagementByIdSuccess,
  getDetailReasonManagementByIdFailed,
  GET_REASON_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/reason-management'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailApi = (params) => {
  const uri = `/v1/sales/reasons/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetail(action) {
  try {
    const response = yield call(getDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailReasonManagementByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailReasonManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailReasonManagement() {
  yield takeLatest(GET_REASON_MANAGEMENT_START, doGetDetail)
}
