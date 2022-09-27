import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmShelfByIdFailed,
  confirmShelfByIdSuccess,
  CONFIRM_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmShelfApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}/confirm`
  return api.put(uri)
}

function* doConfirmShelf(action) {
  try {
    const response = yield call(confirmShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmShelfByIdSuccess(response.payload))

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
    yield put(confirmShelfByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmShelf() {
  yield takeLatest(CONFIRM_SHELF_START, doConfirmShelf)
}
