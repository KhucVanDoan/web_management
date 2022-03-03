import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehousesSectorFailed,
  getWarehousesSectorSuccess,
  GET_WAREHOUSES_SECTOR_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehousesSectorApi = (params) => {
  const uri = `/v1/warehouses/sectors/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehousesSector(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getWarehousesSectorApi, payload)

    if (response?.statusCode === 200) {
      yield put(getWarehousesSectorSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehousesSectorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouses
 */
export default function* watchGetWarehousesSector() {
  yield takeLatest(GET_WAREHOUSES_SECTOR_START, doGetWarehousesSector)
}
