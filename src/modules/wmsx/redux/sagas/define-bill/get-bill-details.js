import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getBillDetailsByIdFailed,
  getBillDetailsByIdSuccess,
  WMSX_GET_BILL_DETAILS_START,
} from '../../actions/define-bill'
/**
 * get bill details API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBillDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBillDetails(action) {
  try {
    const response = yield call(getBillDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBillDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBillDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get bill details
 */
export default function* watchGetBillDetails() {
  yield takeLatest(WMSX_GET_BILL_DETAILS_START, doGetBillDetails)
}
