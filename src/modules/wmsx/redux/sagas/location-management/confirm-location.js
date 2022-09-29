import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmLocationByIdFailed,
  confirmLocationByIdSuccess,
  CONFIRM_LOCATION_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmLocationApi = (params) => {
  const uri = `/v1/warehouse-layouts/locators/${params}/confirm`
  return api.put(uri)
}

function* doConfirmLocation(action) {
  try {
    const response = yield call(confirmLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmLocationByIdSuccess(response.payload))

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
    yield put(confirmLocationByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmLocation() {
  yield takeLatest(CONFIRM_LOCATION_START, doConfirmLocation)
}
