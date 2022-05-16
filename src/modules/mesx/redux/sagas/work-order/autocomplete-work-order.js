import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  autocompleteWorkOrderFailed,
  autocompleteWorkOrderSuccess,
  AUTOCOMPLETE_WORK_ORDER_START,
} from '~/modules/mesx/redux/actions/work-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * autocomplete work order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const AutocompleteWorkOrderApi = (params) => {
  const uri = `/v1/produces/work-orders/${params.id}/autocomplete`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doAutocompleteWorkOrder(action) {
  try {
    const response = yield call(AutocompleteWorkOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(autocompleteWorkOrderSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      throw new Error(response?.message || response?.data?.message)
    }
  } catch (error) {
    addNotification(error?.message, NOTIFICATION_TYPE.ERROR)
    yield put(autocompleteWorkOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch autocomplete work order
 */
export default function* watchAutocompleteWorkOrder() {
  yield takeLatest(AUTOCOMPLETE_WORK_ORDER_START, doAutocompleteWorkOrder)
}
