import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWarehouseTransferMovementsFailed,
  searchWarehouseTransferMovementsSuccess,
  WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer-movements'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWarehouseTransferMovementsApi = (params) => {
  const uri = `/v1/warehouses/transfers/movements/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseTransferMovements(action) {
  try {
    const response = yield call(
      searchWarehouseTransferMovementsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseTransferMovementsSuccess(payload))

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
    yield put(searchWarehouseTransferMovementsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search warehouse-transfers
 */
export default function* watchSearchWarehouseTransferMovements() {
  yield takeLatest(
    WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START,
    doSearchWarehouseTransferMovements,
  )
}
