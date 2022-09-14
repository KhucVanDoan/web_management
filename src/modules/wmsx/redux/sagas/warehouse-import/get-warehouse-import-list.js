import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_WAREHOUSE_IMPORT_MOVEMENTS,
  getWarehouseImportMovementsSuccess,
} from '~/modules/wmsx/redux/actions/warehouse-import'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMovementsApi = (params) => {
  const uri = `/v1/warehouses/movements/list`
  return api.get(uri, params)
  // return res;
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMovements(action) {
  try {
    const response = yield call(getMovementsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseImportMovementsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Get data saga
 */
export default function* watchWarehouseImportData() {
  yield takeLatest(GET_WAREHOUSE_IMPORT_MOVEMENTS, doGetMovements)
}
