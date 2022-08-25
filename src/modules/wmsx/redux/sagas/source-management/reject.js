import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectSourceManagementByIdFailed,
  rejectSourceManagementByIdSuccess,
  REJECT_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/${params}/reject`
  return api.put(uri)
}

function* doRejectSourceManagement(action) {
  try {
    const response = yield call(rejectSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectSourceManagementByIdSuccess(response.payload))

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
    yield put(rejectSourceManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectSourceManagement() {
  yield takeLatest(REJECT_SOURCE_MANAGEMENT_START, doRejectSourceManagement)
}
