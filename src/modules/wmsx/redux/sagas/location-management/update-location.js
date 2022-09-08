import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateLocationFailed,
  updateLocationSuccess,
  UPDATE_LOCATION_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateLocationApi = (params) => {
  //@TODO update api
  const uri = `/v1/sales/constructions/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateLocation(action) {
  try {
    const response = yield call(updateLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateLocationSuccess(response.results))

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
    yield put(updateLocationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateLocation() {
  yield takeLatest(UPDATE_LOCATION_START, doUpdateLocation)
}
