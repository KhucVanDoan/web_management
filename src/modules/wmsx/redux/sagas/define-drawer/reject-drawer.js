import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectDrawerByIdFailed,
  rejectDrawerByIdSuccess,
  REJECT_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectDrawerApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}/reject`
  return api.put(uri)
}

function* doRejectDrawer(action) {
  try {
    const response = yield call(rejectDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectDrawerByIdSuccess(response.payload))

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
    yield put(rejectDrawerByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectDrawer() {
  yield takeLatest(REJECT_DRAWER_START, doRejectDrawer)
}
