import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseImportByIdFailed,
  confirmWarehouseImportByIdSuccess,
  CONFIRM_WAREHOUSE_IMPORT_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmWarehouseImportApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params?.items[0]?.id}/import `
  const data = {
    items: params?.items?.map((item) => ({
      itemId: item?.itemId,
      lotNumber: item?.lotNumber || null,
      locatorId: item?.locatorId,
      quantity: +item?.quantity,
    })),
  }
  return api.put(uri, data)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmWarehouseImport(action) {
  try {
    const response = yield call(confirmWarehouseImportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseImportByIdSuccess(response.payload))

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
    yield put(confirmWarehouseImportByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmWarehouseImport() {
  yield takeLatest(CONFIRM_WAREHOUSE_IMPORT_START, doConfirmWarehouseImport)
}
