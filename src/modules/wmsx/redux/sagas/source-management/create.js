import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSourceManagementFailed,
  createSourceManagementSuccess,
  CREATE_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createSourceManagementApi = (body) => {
  const uri = `/v1/sales/sources/create`
  return api.post(uri, body)
}

function* doCreateSourceManagement(action) {
  try {
    const response = yield call(createSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createSourceManagementSuccess(response.data))

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
    yield put(createSourceManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateSourceManagement() {
  yield takeLatest(CREATE_SOURCE_MANAGEMENT_START, doCreateSourceManagement)
}
