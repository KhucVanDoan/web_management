import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteSourceManagementFailed,
  deleteSourceManagementSuccess,
  DELETE_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/${params}`
  return api.delete(uri)
}

function* doDeleteSourceManagement(action) {
  try {
    const response = yield call(deleteSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteSourceManagementSuccess(response.results))

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
    yield put(deleteSourceManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteSourceManagement() {
  yield takeLatest(DELETE_SOURCE_MANAGEMENT_START, doDeleteSourceManagement)
}
