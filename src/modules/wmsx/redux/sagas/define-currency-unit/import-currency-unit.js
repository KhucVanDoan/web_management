import { call, put, takeLatest } from 'redux-saga/effects'

import {
  importCurrencyUnitFailed,
  importCurrencyUnitSuccess,
  WMSX_IMPORT_CURRENCY_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-currency-unit'
import { api } from '~/services/api'

/**
 * import customer
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importCurrencyUnitApi = (body) => {
  const uri = `/v1/warehouse-yard/currency-units}/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportCurrencyUnit(action) {
  try {
    const response = yield call(importCurrencyUnitApi, action?.payload)

    if (response) {
      yield put(importCurrencyUnitSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importCurrencyUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportCurrencyUnit() {
  yield takeLatest(WMSX_IMPORT_CURRENCY_UNIT_START, doImportCurrencyUnit)
}
