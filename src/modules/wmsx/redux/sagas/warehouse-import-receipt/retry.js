import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  retryFailed,
  retrySuccess,
  RETRY_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const retryApi = (params) => {
  const uri = `/monitor-orders/${params}/re-sign`
  return api.put(uri)
}

function* doRetry(action) {
  try {
    const response = yield call(retryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(retrySuccess(response.payload))

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
    yield put(retryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRetry() {
  yield takeLatest(RETRY_START, doRetry)
}
