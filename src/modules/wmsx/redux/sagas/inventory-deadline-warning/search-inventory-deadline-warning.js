import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchInventoryDeadlineWarningSuccess,
  searchInventoryDeadlineWarningFailed,
  WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START,
} from '~/modules/wmsx/redux/actions/inventory-deadline-warning'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search warehouse inventoryDeadlineWarning API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryDeadlineWarningApi = (params) => {
  const uri = `/v1/warehouses/inventory-warnings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventoryDeadlineWarning(action) {
  try {
    const response = yield call(
      searchInventoryDeadlineWarningApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      // Call callback action if provided
      yield put(searchInventoryDeadlineWarningSuccess(payload))

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
    yield put(searchInventoryDeadlineWarningFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchInventoryDeadlineWarning() {
  yield takeLatest(
    WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START,
    doSearchInventoryDeadlineWarning,
  )
}
