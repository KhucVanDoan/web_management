import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectConstructionByIdFailed,
  rejectConstructionByIdSuccess,
  REJECT_CONSTRUCTION_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectConstructionApi = (params) => {
  const uri = `/v1/sales/constructions/${params}/reject`
  return api.put(uri)
}

function* doRejectConstruction(action) {
  try {
    const response = yield call(rejectConstructionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectConstructionByIdSuccess(response.payload))

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
    yield put(rejectConstructionByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectConstruction() {
  yield takeLatest(REJECT_CONSTRUCTION_START, doRejectConstruction)
}
