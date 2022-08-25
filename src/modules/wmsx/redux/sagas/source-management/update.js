import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateSourceManagementFailed,
  updateSourceManagementSuccess,
  UPDATE_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateSourceManagement(action) {
  try {
    const response = yield call(updateSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateSourceManagementSuccess(response.results))

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
    yield put(updateSourceManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateSourceManagement() {
  yield takeLatest(UPDATE_SOURCE_MANAGEMENT_START, doUpdateSourceManagement)
}
