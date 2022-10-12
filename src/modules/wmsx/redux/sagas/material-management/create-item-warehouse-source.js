import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createItemWarehouseSourceFailed,
  createItemWarehouseSourceSuccess,
  CREATE_ITEM_WAREHOUSE_SOURCE_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createItemWarehouseSourceApi = (payload) => {
  //@TODO update api
  const uri = `/v1/items/item-warehouse-sources/create-warehouse`
  return api.post(uri, payload)
}

function* doCreateItemWarehouseSource(action) {
  try {
    const response = yield call(createItemWarehouseSourceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createItemWarehouseSourceSuccess(response.results))

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
    yield put(createItemWarehouseSourceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateItemWarehouseSource() {
  yield takeLatest(CREATE_ITEM_WAREHOUSE_SOURCE_START, doCreateItemWarehouseSource)
}
