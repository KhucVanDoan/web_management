import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateItemWarehouseSourceFailed,
  updateItemWarehouseSourceSuccess,
  UPDATE_ITEM_WAREHOUSE_SOURCE_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateItemWarehouseSourceApi = (payload) => {
  //@TODO update api
  const uri = `/v1/items/item-warehouse-sources/update-source`
  return api.put(uri, payload)
}

function* doUpdateItemWarehouseSource(action) {
  try {
    const response = yield call(updateItemWarehouseSourceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateItemWarehouseSourceSuccess(response.results))

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
    yield put(updateItemWarehouseSourceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateItemWarehouseSource() {
  yield takeLatest(UPDATE_ITEM_WAREHOUSE_SOURCE_START, doUpdateItemWarehouseSource)
}
