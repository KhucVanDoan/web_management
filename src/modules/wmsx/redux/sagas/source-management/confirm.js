import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmSourceManagementByIdFailed,
  confirmSourceManagementByIdSuccess,
  CONFIRM_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/${params}/confirm`
  return api.put(uri)
}

function* doConfirmSourceManagement(action) {
  try {
    const response = yield call(confirmSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmSourceManagementByIdSuccess(response.payload))

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
    yield put(confirmSourceManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmSourceManagement() {
  yield takeLatest(CONFIRM_SOURCE_MANAGEMENT_START, doConfirmSourceManagement)
}
