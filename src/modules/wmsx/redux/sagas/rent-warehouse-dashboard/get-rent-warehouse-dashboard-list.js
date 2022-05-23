import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getRentWarehouseDashboardListFailed,
  getRentWarehouseDashboardListSuccess,
  WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST,
} from '../../actions/rent-warehouse-dashboard'
/**
 * Get rent warehouse list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRentWarehouseDashboardListApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/reports`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRentWarehouseDashboardList(action) {
  try {
    const response = yield call(
      getRentWarehouseDashboardListApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(getRentWarehouseDashboardListSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRentWarehouseDashboardListFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search sale-orders
 */
export default function* watchGetRentWarehouseDashboardList() {
  yield takeLatest(
    WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST,
    doGetRentWarehouseDashboardList,
  )
}
