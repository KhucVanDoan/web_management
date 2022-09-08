import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteLocationFailed,
  deleteLocationSuccess,
  DELETE_LOCATION_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteLocationApi = (params) => {
  //@TODO udpate api
  const uri = `/v1/sales/constructions/${params}`
  return api.delete(uri)
}

function* doDeleteLocation(action) {
  try {
    const response = yield call(deleteLocationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteLocationSuccess(response.results))

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
    yield put(deleteLocationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteLocation() {
  yield takeLatest(DELETE_LOCATION_START, doDeleteLocation)
}
