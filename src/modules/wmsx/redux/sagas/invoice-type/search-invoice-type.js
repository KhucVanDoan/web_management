import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchInvoiceTypesFailed,
  searchInvoiceTypesSuccess,
  WMSX_SEARCH_INVOICE_TYPES_START,
} from '../../actions/invoice-type'

/**
 * Search invoice types API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInvoiceTypesApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInvoiceTypes(action) {
  try {
    const response = yield call(searchInvoiceTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchInvoiceTypesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInvoiceTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchInvoiceTypes() {
  yield takeLatest(WMSX_SEARCH_INVOICE_TYPES_START, doSearchInvoiceTypes)
}
