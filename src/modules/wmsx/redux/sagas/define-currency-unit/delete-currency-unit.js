import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCurrencyUnitFailed,
  deleteCurrencyUnitSuccess,
  WMSX_DELETE_CURRENCY_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCurrencyUnitApi = (params) => {
  const uri = `/v1/warehouse-yard/currency-units/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCurrencyUnit(action) {
  try {
    const response = yield call(deleteCurrencyUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCurrencyUnitSuccess(response.results))

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
    yield put(deleteCurrencyUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteCurrencyUnit() {
  yield takeLatest(WMSX_DELETE_CURRENCY_UNIT_START, doDeleteCurrencyUnit)
}
