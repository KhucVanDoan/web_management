import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmAssemblyByIdFailed,
  confirmAssemblyByIdSuccess,
  CONFIRM_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmAssemblyApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}/confirm`
  return api.put(uri)
}

function* doConfirmAssembly(action) {
  try {
    const response = yield call(confirmAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmAssemblyByIdSuccess(response.payload))

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
    yield put(confirmAssemblyByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmAssembly() {
  yield takeLatest(CONFIRM_ASSEMBLY_START, doConfirmAssembly)
}
