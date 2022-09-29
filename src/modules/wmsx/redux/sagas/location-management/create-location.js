import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createLocationFailed,
  createLocationSuccess,
  CREATE_LOCATION_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createLocationApi = (body) => {
  const uri = `/v1/warehouse-layouts/locators/create`
  return api.post(uri, body)
}

function* doCreateLocation(action) {
  try {
    const response = yield call(createLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createLocationSuccess(response.data))

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
    yield put(createLocationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateLocation() {
  yield takeLatest(CREATE_LOCATION_START, doCreateLocation)
}
