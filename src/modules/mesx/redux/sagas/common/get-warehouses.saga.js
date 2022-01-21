import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getWarehousesFailed,
  getWarehousesSuccess,
  GET_WAREHOUSES_START,
} from 'modules/mesx/redux/actions/common.action'

/**
 * Get warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehousesApi = (params) => {
  const uri = `/v1/warehouses/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouses(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getWarehousesApi, payload)

    if (response?.statusCode === 200) {
      yield put(getWarehousesSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehousesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouses
 */
export default function* watchGetWarehouses() {
  yield takeLatest(GET_WAREHOUSES_START, doGetWarehouses)
}
