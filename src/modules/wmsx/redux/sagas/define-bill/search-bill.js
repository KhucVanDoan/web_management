import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchBillsFailed,
  searchBillsSuccess,
  WMSX_SEARCH_BILL_START,
} from '../../actions/define-bill'

/**
 * Search bill API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
// @TODO: waiting feature define service
export const getAllServicesDetailApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/services`
  return api.get(uri, params)
}

const searchBillsApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBills(action) {
  try {
    const response = yield call(searchBillsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBillsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBillsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bill
 */
export default function* watchSearchBills() {
  yield takeLatest(WMSX_SEARCH_BILL_START, doSearchBills)
}
