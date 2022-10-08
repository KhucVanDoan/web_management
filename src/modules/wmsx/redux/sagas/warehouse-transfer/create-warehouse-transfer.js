import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseTransferFailed,
  createWarehouseTransferSuccess,
  CREATE_WAREHOUSE_TRANSFER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createWarehouseTransfersApi = (params) => {
  let form_data = new FormData()
  for (let key in params) {
    form_data.append(key, params[key])
  }
  const uri = `/v1/warehouses/transfers/create`
  return api.post(uri, form_data)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWarehouseTransfer(action) {
  try {
    const response = yield call(createWarehouseTransfersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseTransferSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createWarehouseTransferFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWarehouseTransfer() {
  yield takeLatest(CREATE_WAREHOUSE_TRANSFER_START, doCreateWarehouseTransfer)
}
