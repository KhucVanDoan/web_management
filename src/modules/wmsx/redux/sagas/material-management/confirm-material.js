import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmMaterialByIdFailed,
  confirmMaterialByIdSuccess,
  CONFIRM_MATERIAL_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmMaterialApi = (params) => {
  //@TODO update api
  const uri = `/v1/sales/constructions/${params}/confirm`
  return api.put(uri)
}

function* doConfirmMaterial(action) {
  try {
    const response = yield call(confirmMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmMaterialByIdSuccess(response.payload))

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
    yield put(confirmMaterialByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmMaterial() {
  yield takeLatest(CONFIRM_MATERIAL_START, doConfirmMaterial)
}
