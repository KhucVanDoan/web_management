import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  WMSX_SEARCH_CURRENCY_UNITS_START,
  searchCurrencyUnitsSuccess,
  searchCurrencyUnitsFailed,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchCurrencyUnitsApi = (params) => {
  const uri = `/v1/warehouse-yard/currency-units/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCurrencyUnit(action) {
  try {
    const response = yield call(searchCurrencyUnitsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchCurrencyUnitsSuccess(payload))

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
    yield put(searchCurrencyUnitsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchCurrencyUnits() {
  yield takeLatest(WMSX_SEARCH_CURRENCY_UNITS_START, doSearchCurrencyUnit)
}
