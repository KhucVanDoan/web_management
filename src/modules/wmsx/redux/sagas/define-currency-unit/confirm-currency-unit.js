import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmCurrencyUnitByIdFailed,
  confirmCurrencyUnitByIdSuccess,
  WMSX_CONFIRM_CURRENCY_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Confirm sale order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmCurrencyUnitApi = (params) => {
  const uri = `/v1/warehouse-yard/currency-units/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmCurrencyUnit(action) {
  try {
    const response = yield call(confirmCurrencyUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmCurrencyUnitByIdSuccess(response.payload))

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
    yield put(confirmCurrencyUnitByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmCurrencyUnit() {
  yield takeLatest(WMSX_CONFIRM_CURRENCY_UNIT_START, doConfirmCurrencyUnit)
}
