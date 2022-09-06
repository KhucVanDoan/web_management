import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectBinByIdFailed,
  rejectBinByIdSuccess,
  REJECT_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectBinApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}/reject`
  return api.put(uri)
}

function* doRejectBin(action) {
  try {
    const response = yield call(rejectBinApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectBinByIdSuccess(response.payload))

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
    yield put(rejectBinByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectBin() {
  yield takeLatest(REJECT_BIN_START, doRejectBin)
}
