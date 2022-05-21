import { call, put, takeLatest } from 'redux-saga/effects'

import {
  importTypeUnitFailed,
  importTypeUnitSuccess,
  WMSX_IMPORT_TYPE_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'

/**
 * import customer
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importTypeUnitApi = (body) => {
  const uri = `/v1/warehouse-yard/rent-units/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportTypeUnit(action) {
  try {
    const response = yield call(importTypeUnitApi, action?.payload)

    if (response) {
      yield put(importTypeUnitSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importTypeUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportTypeUnit() {
  yield takeLatest(WMSX_IMPORT_TYPE_UNIT_START, doImportTypeUnit)
}
