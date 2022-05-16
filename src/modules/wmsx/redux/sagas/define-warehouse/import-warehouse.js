import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  importWarehouseFailed,
  importWarehouseSuccess,
  WMSX_IMPORT_WAREHOUSE_START,
} from '../../actions/define-warehouse'

/**
 * import warehouse
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importWarehouseApi = (body) => {
  const uri = `/v1/warehouses/warehouses/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportWarehouse(action) {
  try {
    const response = yield call(importWarehouseApi, action?.payload)

    if (response) {
      yield put(importWarehouseSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportWarehouse() {
  yield takeLatest(WMSX_IMPORT_WAREHOUSE_START, doImportWarehouse)
}
