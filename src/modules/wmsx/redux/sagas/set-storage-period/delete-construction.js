import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteStoragePeriodFailed,
  deleteStoragePeriodSuccess,
  DELETE_STORAGE_PERIOD_START,
} from '~/modules/wmsx/redux/actions/set-storage-period'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteStoragePeriodApi = (params) => {
  const uri = `/v1/items/inventory-time-norms/${params}`
  return api.delete(uri)
}

function* doDeleteStoragePeriod(action) {
  try {
    const response = yield call(deleteStoragePeriodApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteStoragePeriodSuccess(response.results))

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
    yield put(deleteStoragePeriodFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteStoragePeriod() {
  yield takeLatest(DELETE_STORAGE_PERIOD_START, doDeleteStoragePeriod)
}
