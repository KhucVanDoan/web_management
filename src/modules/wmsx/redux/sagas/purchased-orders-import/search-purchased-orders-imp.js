import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchPOImportsFailed,
  searchPOImportsSuccess,
  SEARCH_PO_IMPORT_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'

/**
 * Search purchased-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchPOImportApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPOImport(action) {
  try {
    const response = yield call(searchPOImportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPOImportsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchPOImportsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchPOImport() {
  yield takeLatest(SEARCH_PO_IMPORT_START, doSearchPOImport)
}
