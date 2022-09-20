import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmUnitManagementByIdFailed,
  confirmUnitManagementByIdSuccess,
  CONFIRM_UNIT_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmUnitManagementApi = (params) => {
  const uri = `/v1/users/department-settings/${params}/confirm`
  return api.put(uri)
}

function* doConfirmUnitManagement(action) {
  try {
    const response = yield call(confirmUnitManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmUnitManagementByIdSuccess(response.payload))

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
    yield put(confirmUnitManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmUnitManagement() {
  yield takeLatest(CONFIRM_UNIT_MANAGEMENT_START, doConfirmUnitManagement)
}
