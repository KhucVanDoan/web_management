import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  importWarehouseFailed,
  importWarehouseSuccess,
  IMPORT_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const importWarehouseApi = (payload) => {
  const uri = `/v1/warehouses/import`
  return api.post(uri, payload)
}

function* doImportWarehouse(action) {
  try {
    const response = yield call(importWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(importWarehouseSuccess(response.data))

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
    yield put(importWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchImportWarehouse() {
  yield takeLatest(IMPORT_WAREHOUSE_START, doImportWarehouse)
}
