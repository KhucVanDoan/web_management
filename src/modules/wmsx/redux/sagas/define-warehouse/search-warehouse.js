import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseFailed,
  searchWarehouseSuccess,
  SEARCH_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'

export const searchWarehouseApi = (params) => {
  const uri = `/v1/warehouses/list`
  return api.get(uri, params)
}
export const searchWarehouseByUserApi = (params) => {
  const uri = `/v1/users/warehouse/list-by-user`
  return api.get(uri, params)
}
function* doSearchWarehouse(action) {
  try {
    const response = yield call(searchWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarehouse() {
  yield takeLatest(SEARCH_WAREHOUSE_START, doSearchWarehouse)
}
