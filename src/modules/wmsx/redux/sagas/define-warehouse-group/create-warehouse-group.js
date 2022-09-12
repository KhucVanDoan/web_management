import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseGroupFailed,
  createWarehouseGroupSuccess,
  CREATE_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseGroupApi = (body) => {
  const uri = `/v1/warehouses/warehouse-type-settings/create`
  return api.post(uri, body)
}

function* doCreateWarehouseGroup(action) {
  try {
    const response = yield call(createWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseGroupSuccess(response.data))

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
    yield put(createWarehouseGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouseGroup() {
  yield takeLatest(CREATE_WAREHOUSE_GROUP_START, doCreateWarehouseGroup)
}
