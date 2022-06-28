import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDesignByWarehouseIdFailed,
  getDesignByWarehouseIdSuccess,
  GET_DESIGN_BY_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'

/**
 * Get block location detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDesignByWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params}/design`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDesignByWarehouse(action) {
  try {
    const response = yield call(getDesignByWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDesignByWarehouseIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDesignByWarehouseIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDesignByWarehouseIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDesignByWarehouse() {
  yield takeLatest(GET_DESIGN_BY_WAREHOUSE_START, doGetDesignByWarehouse)
}
