import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCurrencyUnitDetailsByIdSuccess,
  getCurrencyUnitDetailsByIdFailed,
  WMSX_GET_CURRENCY_UNIT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCurrencyUnitDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/currency-units/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCurrencyUnitDetails(action) {
  try {
    const response = yield call(getCurrencyUnitDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCurrencyUnitDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCurrencyUnitDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCurrencyUnitDetails() {
  yield takeLatest(
    WMSX_GET_CURRENCY_UNIT_DETAILS_START,
    doGetCurrencyUnitDetails,
  )
}
