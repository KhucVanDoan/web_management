import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchPaymentTypesFailed,
  searchPaymentTypesSuccess,
  SEARCH_PAYMENT_TYPES_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const searchPaymentTypesApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPaymentTypes(action) {
  try {
    const response = yield call(searchPaymentTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPaymentTypesSuccess(payload))

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
    yield put(searchPaymentTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchSearchPaymentTypes() {
  yield takeLatest(SEARCH_PAYMENT_TYPES_START, doSearchPaymentTypes)
}
