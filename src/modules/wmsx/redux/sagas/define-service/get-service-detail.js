import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getServiceDetailByIdSuccess,
  getServiceDetailByIdFailed,
  WMSX_GET_SERVICE_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
/**
 * Get detail service API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getServiceDetailApi = (params) => {
  const uri = `/v1/warehouse-yard/services/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetServiceDetail(action) {
  try {
    const response = yield call(getServiceDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getServiceDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getServiceDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get service detail
 */
export default function* watchGetServiceDetail() {
  yield takeLatest(WMSX_GET_SERVICE_DETAIL_START, doGetServiceDetail)
}
