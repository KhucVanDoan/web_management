import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchInventorySuccess,
  searchInventoryFailed,
  WMSX_SEARCH_INVENTORY_START,
} from '~/modules/wmsx/redux/actions/inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse inventoryWarning API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryApi = (params) => {
  const uri = `/v1/warehouses/inventories/warehouse-transactions/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventory(action) {
  try {
    const response = yield call(searchInventoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchInventorySuccess(payload))

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
    yield put(searchInventoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchInventory() {
  yield takeLatest(WMSX_SEARCH_INVENTORY_START, doSearchInventory)
}
