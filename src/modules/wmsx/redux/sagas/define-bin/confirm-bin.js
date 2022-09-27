import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmBinByIdFailed,
  confirmBinByIdSuccess,
  CONFIRM_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmBinApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}/confirm`
  return api.put(uri)
}

function* doConfirmBin(action) {
  try {
    const response = yield call(confirmBinApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmBinByIdSuccess(response.payload))

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
    yield put(confirmBinByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmBin() {
  yield takeLatest(CONFIRM_BIN_START, doConfirmBin)
}
