import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectAssemblyByIdFailed,
  rejectAssemblyByIdSuccess,
  REJECT_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectAssemblyApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}/reject`
  return api.put(uri)
}

function* doRejectAssembly(action) {
  try {
    const response = yield call(rejectAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectAssemblyByIdSuccess(response.payload))

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
    yield put(rejectAssemblyByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectAssembly() {
  yield takeLatest(REJECT_ASSEMBLY_START, doRejectAssembly)
}
