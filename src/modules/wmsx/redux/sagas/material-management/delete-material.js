import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteMaterialFailed,
  deleteMaterialSuccess,
  DELETE_MATERIAL_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteMaterialApi = (params) => {
  //@TODO udpate api
  const uri = `/v1/sales/constructions/${params}`
  return api.delete(uri)
}

function* doDeleteMaterial(action) {
  try {
    const response = yield call(deleteMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMaterialSuccess(response.results))

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
    yield put(deleteMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteMaterial() {
  yield takeLatest(DELETE_MATERIAL_START, doDeleteMaterial)
}
