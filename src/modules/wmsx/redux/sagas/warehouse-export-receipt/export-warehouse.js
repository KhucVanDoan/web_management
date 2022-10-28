import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  exportWarehouseFailed,
  exportWarehouseSuccess,
  EXPORT_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const exportWarehouseApi = (payload) => {
  const uri = `/v1/warehouses/export`
  return api.post(uri, payload)
}

function* doExportWarehouse(action) {
  try {
    const response = yield call(
      exportWarehouseApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(exportWarehouseSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(exportWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchExportWarehouse() {
  yield takeLatest(
    EXPORT_WAREHOUSE_START,
    doExportWarehouse,
  )
}
