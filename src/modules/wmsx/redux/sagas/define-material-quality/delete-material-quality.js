import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteMaterialQualityFailed,
  deleteMaterialQualitySuccess,
  DELETE_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/${params}`
  return api.delete(uri)
}

function* doDeleteMaterialQuality(action) {
  try {
    const response = yield call(deleteMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMaterialQualitySuccess(response.results))

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
    yield put(deleteMaterialQualityFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteMaterialQuality() {
  yield takeLatest(DELETE_MATERIAL_QUALITY_START, doDeleteMaterialQuality)
}
