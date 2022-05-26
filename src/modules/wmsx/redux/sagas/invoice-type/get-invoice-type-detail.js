import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getInvoiceTypeDetailByIdFailed,
  getInvoiceTypeDetailByIdSuccess,
  WMSX_GET_INVOICE_TYPE_DETAIL_START,
} from '../../actions/invoice-type'

/**
 * Get detail invoice type API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInvoiceTypeDetailApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInvoiceTypeDetail(action) {
  try {
    const response = yield call(getInvoiceTypeDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInvoiceTypeDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInvoiceTypeDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get invoice type detail
 */
export default function* watchGetInvoiceTypeDetail() {
  yield takeLatest(WMSX_GET_INVOICE_TYPE_DETAIL_START, doGetInvoiceTypeDetail)
}
