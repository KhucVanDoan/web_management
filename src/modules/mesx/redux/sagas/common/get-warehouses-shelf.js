import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehousesShelfFailed,
  getWarehousesShelfSuccess,
  GET_WAREHOUSES_SHELF_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehousesShelfApi = (params) => {
  const uri = `/v1/warehouses/shelfs/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehousesShelf(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getWarehousesShelfApi, payload)

    if (response?.statusCode === 200) {
      yield put(getWarehousesShelfSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehousesShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouses
 */
export default function* watchGetWarehousesShelf() {
  yield takeLatest(GET_WAREHOUSES_SHELF_START, doGetWarehousesShelf)
}
