import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseGroupByIdFailed,
  confirmWarehouseGroupByIdSuccess,
  CONFIRM_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseGroupApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/${params}/confirm`
  return api.put(uri)
}

function* doConfirmWarehouseGroup(action) {
  try {
    const response = yield call(confirmWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseGroupByIdSuccess(response.payload))

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
    yield put(confirmWarehouseGroupByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseGroup() {
  yield takeLatest(CONFIRM_WAREHOUSE_GROUP_START, doConfirmWarehouseGroup)
}
