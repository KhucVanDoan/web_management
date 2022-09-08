import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectLocationByIdFailed,
  rejectLocationByIdSuccess,
  REJECT_LOCATION_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectLocationApi = (params) => {
  //@TODO udpate api
  const uri = `/v1/sales/constructions/${params}/reject`
  return api.put(uri)
}

function* doRejectLocation(action) {
  try {
    const response = yield call(rejectLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectLocationByIdSuccess(response.payload))

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
    yield put(rejectLocationByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectLocation() {
  yield takeLatest(REJECT_LOCATION_START, doRejectLocation)
}
