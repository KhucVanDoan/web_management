import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWarehouseAreasFailed,
  searchWarehouseAreasSuccess,
  SEARCH_WAREHOUSE_AREAS_START,
} from '~/modules/wmsx/redux/actions/warehouse-area'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search warehouse areas api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehouseAreasApi = (params) => {
  const uri = `/v1/warehouses/sectors/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseAreas(action) {
  try {
    const response = yield call(searchWarehouseAreasApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseAreasSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseAreasFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchSearchWarehouseAreas() {
  yield takeLatest(SEARCH_WAREHOUSE_AREAS_START, doSearchWarehouseAreas)
}
