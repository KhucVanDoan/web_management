import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAllServicesDetailSuccess,
  getAllServicesDetailFailed,
  WMSX_GET_ALL_SERVICES_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-service'
import { api } from '~/services/api'
/**
 * Get detail service API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAllServicesDetailApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/services`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAllServicesDetail(action) {
  try {
    const response = yield call(getAllServicesDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getAllServicesDetailSuccess(response.data.services))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllServicesDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get service detail
 */
export default function* watchGetAllServicesDetail() {
  yield takeLatest(WMSX_GET_ALL_SERVICES_DETAIL_START, doGetAllServicesDetail)
}
