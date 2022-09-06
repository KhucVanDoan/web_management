import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmDrawerByIdFailed,
  confirmDrawerByIdSuccess,
  CONFIRM_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmDrawerApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}/confirm`
  return api.put(uri)
}

function* doConfirmDrawer(action) {
  try {
    const response = yield call(confirmDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmDrawerByIdSuccess(response.payload))

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
    yield put(confirmDrawerByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmDrawer() {
  yield takeLatest(CONFIRM_DRAWER_START, doConfirmDrawer)
}
