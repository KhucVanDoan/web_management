import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createStoragePeriodFailed,
  createStoragePeriodSuccess,
  CREATE_STORAGE_PERIOD_START,
} from '~/modules/wmsx/redux/actions/set-storage-period'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createStoragePeriodApi = (body) => {
  const uri = `/v1/warehouses/inventory-time-limits/create`
  return api.post(uri, body)
}

function* doCreateStoragePeriod(action) {
  try {
    const response = yield call(createStoragePeriodApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createStoragePeriodSuccess(response.data))

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
    yield put(createStoragePeriodFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateStoragePeriod() {
  yield takeLatest(CREATE_STORAGE_PERIOD_START, doCreateStoragePeriod)
}
