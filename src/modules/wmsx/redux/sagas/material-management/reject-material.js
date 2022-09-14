import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMaterialByIdFailed,
  rejectMaterialByIdSuccess,
  REJECT_MATERIAL_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectMaterialApi = (params) => {
  //@TODO udpate api
  const uri = `/v1/items/${params}/reject`
  return api.put(uri)
}

function* doRejectMaterial(action) {
  try {
    const response = yield call(rejectMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectMaterialByIdSuccess(response.payload))

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
    yield put(rejectMaterialByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectMaterial() {
  yield takeLatest(REJECT_MATERIAL_START, doRejectMaterial)
}
