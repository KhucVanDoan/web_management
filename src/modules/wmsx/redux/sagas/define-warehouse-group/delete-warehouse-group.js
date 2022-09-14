import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseGroupFailed,
  deleteWarehouseGroupSuccess,
  DELETE_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteWarehouseGroupApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.delete(uri)
}

function* doDeleteWarehouseGroup(action) {
  try {
    const response = yield call(deleteWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseGroupSuccess(response.results))

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
    yield put(deleteWarehouseGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteWarehouseGroup() {
  yield takeLatest(DELETE_WAREHOUSE_GROUP_START, doDeleteWarehouseGroup)
}