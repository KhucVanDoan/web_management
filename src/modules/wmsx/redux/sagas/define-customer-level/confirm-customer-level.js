import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmCustomerLevelByIdFailed,
  confirmCustomerLevelByIdSuccess,
  CONFIRM_CUSTOMER_LEVEL_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Confirm purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmCustomerLevelApi = (params) => {
  const uri = `/v1/warehouse-yard/customer-classes/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmCustomerLevel(action) {
  try {
    const response = yield call(confirmCustomerLevelApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmCustomerLevelByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmCustomerLevelByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmCustomerLevel() {
  yield takeLatest(CONFIRM_CUSTOMER_LEVEL_START, doConfirmCustomerLevel)
}
