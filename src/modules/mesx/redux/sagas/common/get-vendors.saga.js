import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getVendorsFailed,
  getVendorsSuccess,
  GET_VENDORS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get all vendors API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getVendorsApi = (params) => {
  const uri = `/v1/sales/vendors/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetVendors(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getVendorsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getVendorsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getVendorsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all vendors
 */
export default function* watchGetVendors() {
  yield takeLatest(GET_VENDORS_START, doGetVendors)
}
