import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectWarehouseByIdFailed,
  rejectWarehouseByIdSuccess,
  REJECT_WAREHOUSE_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseApi = (params) => {
  const uri = `/v1/warehouses/${params}/reject`
  return api.put(uri)
}

function* doRejectWarehouse(action) {
  try {
    const response = yield call(rejectWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseByIdSuccess(response.payload))

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
    yield put(rejectWarehouseByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectWarehouse() {
  yield takeLatest(REJECT_WAREHOUSE_START, doRejectWarehouse)
}
