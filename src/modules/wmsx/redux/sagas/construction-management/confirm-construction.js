import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmConstructionByIdFailed,
  confirmConstructionByIdSuccess,
  CONFIRM_CONSTRUCTION_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmConstructionApi = (params) => {
  const uri = `/v1/sales/constructions/${params}/confirm`
  return api.put(uri)
}

function* doConfirmConstruction(action) {
  try {
    const response = yield call(confirmConstructionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmConstructionByIdSuccess(response.payload))

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
    yield put(confirmConstructionByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmConstruction() {
  yield takeLatest(CONFIRM_CONSTRUCTION_START, doConfirmConstruction)
}
