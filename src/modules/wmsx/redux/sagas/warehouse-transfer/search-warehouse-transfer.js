import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWarehouseTransfersFailed,
  searchWarehouseTransfersSuccess,
  SEARCH_WAREHOUSE_TRANSFERS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse-transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWarehouseTransfersApi = (params) => {
  const uri = `/v1/warehouses/transfers/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseTransfers(action) {
  try {
    const response = yield call(searchWarehouseTransfersApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseTransfersSuccess(payload))
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
    yield put(searchWarehouseTransfersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search warehouse-transfers
 */
export default function* watchSearchWarehouseTransfers() {
  yield takeLatest(SEARCH_WAREHOUSE_TRANSFERS_START, doSearchWarehouseTransfers)
}
