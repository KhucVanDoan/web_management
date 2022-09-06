import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectWarehouseGroupByIdFailed,
  rejectWarehouseGroupByIdSuccess,
  REJECT_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseGroupApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}/reject`
  return api.put(uri)
}

function* doRejectWarehouseGroup(action) {
  try {
    const response = yield call(rejectWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseGroupByIdSuccess(response.payload))

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
    yield put(rejectWarehouseGroupByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectWarehouseGroup() {
  yield takeLatest(REJECT_WAREHOUSE_GROUP_START, doRejectWarehouseGroup)
}
