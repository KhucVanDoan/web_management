import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseGroupFailed,
  updateWarehouseGroupSuccess,
  UPDATE_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseGroupApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateWarehouseGroup(action) {
  try {
    const response = yield call(updateWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseGroupSuccess(response.results))

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
    yield put(updateWarehouseGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseGroup() {
  yield takeLatest(UPDATE_WAREHOUSE_GROUP_START, doUpdateWarehouseGroup)
}
