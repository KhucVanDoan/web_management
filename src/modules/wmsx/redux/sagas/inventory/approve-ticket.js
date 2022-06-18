import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  approveInventorySuccess,
  approveInventoryFailed,
  WMSX_APPROVE_INVENTORY_START,
  approveInventoryFailedToGetData,
} from '../../actions/inventory'

/**
 * Approve inventory
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const approveInventoryApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/approve`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doApproveInventory(action) {
  try {
    const response = yield call(approveInventoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveInventorySuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      if (response?.data) {
        yield put(approveInventoryFailedToGetData(response.data))
        yield action.onError()
      } else {
        addNotification(
          response?.message || response?.statusText,
          NOTIFICATION_TYPE.ERROR,
        )

        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(approveInventoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchApproveInventory() {
  yield takeLatest(WMSX_APPROVE_INVENTORY_START, doApproveInventory)
}
