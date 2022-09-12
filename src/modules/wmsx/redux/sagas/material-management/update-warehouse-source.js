import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseSourceFailed,
  updateWarehouseSourceSuccess,
  UPDATE_WAREHOUSE_SOURCE_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseSourceApi = (params) => {
  //@TODO update api
  const uri = `/v1/sales/constructions/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateWarehouseSource(action) {
  try {
    const response = yield call(updateWarehouseSourceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseSourceSuccess(response.results))

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
    yield put(updateWarehouseSourceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseSource() {
  yield takeLatest(UPDATE_WAREHOUSE_SOURCE_START, doUpdateWarehouseSource)
}
