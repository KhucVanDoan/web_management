import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteDrawerFailed,
  deleteDrawerSuccess,
  DELETE_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteDrawerApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}`
  return api.delete(uri)
}

function* doDeleteDrawer(action) {
  try {
    const response = yield call(deleteDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteDrawerSuccess(response.results))

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
    yield put(deleteDrawerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteDrawer() {
  yield takeLatest(DELETE_DRAWER_START, doDeleteDrawer)
}
