import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateMaterialFailed,
  updateMaterialSuccess,
  UPDATE_MATERIAL_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateMaterialApi = (params) => {
  //@TODO update api
  const uri = `/v1/items/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateMaterial(action) {
  try {
    const response = yield call(updateMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaterialSuccess(response.results))

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
    yield put(updateMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateMaterial() {
  yield takeLatest(UPDATE_MATERIAL_START, doUpdateMaterial)
}
