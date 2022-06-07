import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createCurrencyUnitSuccess,
  createCurrencyUnitFailed,
  WMSX_CREATE_CURRENCY_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createCurrencyUnitApi = (params) => {
  const uri = `/v1/warehouse-yard/currency-units/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateCurrencyUnit(action) {
  try {
    const response = yield call(createCurrencyUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createCurrencyUnitSuccess(response.data))

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
    yield put(createCurrencyUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateCurrencyUnit() {
  yield takeLatest(WMSX_CREATE_CURRENCY_UNIT_START, doCreateCurrencyUnit)
}
