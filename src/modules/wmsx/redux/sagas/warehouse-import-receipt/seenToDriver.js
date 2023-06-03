import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  seenToDriverFailed,
  seenToDriverSuccess,
  SEEN_TO_DRIVER_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const SeenToDriverApi = (params) => {
  const uri = `/monitor-orders/${params}/to-sign`
  return api.put(uri)
}

function* doSeenToDriver(action) {
  try {
    const response = yield call(SeenToDriverApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(seenToDriverSuccess(response.payload))

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
    yield put(seenToDriverFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSeenToDriver() {
  yield takeLatest(SEEN_TO_DRIVER_START, doSeenToDriver)
}
