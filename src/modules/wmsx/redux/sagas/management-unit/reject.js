import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectUnitManagementByIdFailed,
  rejectUnitManagementByIdSuccess,
  REJECT_UNIT_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectUnitManagementApi = (params) => {
  const uri = `/v1/users/department-settings/${params}/reject`
  return api.put(uri)
}

function* doRejectUnitManagement(action) {
  try {
    const response = yield call(rejectUnitManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectUnitManagementByIdSuccess(response.payload))

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
    yield put(rejectUnitManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectUnitManagement() {
  yield takeLatest(REJECT_UNIT_MANAGEMENT_START, doRejectUnitManagement)
}
