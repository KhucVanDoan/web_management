import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateStoragePeriodFailed,
  updateStoragePeriodSuccess,
  UPDATE_STORAGE_PERIOD_START,
} from '~/modules/wmsx/redux/actions/set-storage-period'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateStoragePeriodApi = (params) => {
  const uri = `/v1/warehouses/inventory-time-limits/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateStoragePeriod(action) {
  try {
    const response = yield call(updateStoragePeriodApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateStoragePeriodSuccess(response.results))

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
    yield put(updateStoragePeriodFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateStoragePeriod() {
  yield takeLatest(UPDATE_STORAGE_PERIOD_START, doUpdateStoragePeriod)
}
