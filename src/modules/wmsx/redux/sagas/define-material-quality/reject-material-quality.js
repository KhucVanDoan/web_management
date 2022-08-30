import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMaterialQualityByIdFailed,
  rejectMaterialQualityByIdSuccess,
  REJECT_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/${params}/reject`
  return api.put(uri)
}

function* doRejectMaterialQuality(action) {
  try {
    const response = yield call(rejectMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectMaterialQualityByIdSuccess(response.payload))

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
    yield put(rejectMaterialQualityByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectMaterialQuality() {
  yield takeLatest(REJECT_MATERIAL_QUALITY_START, doRejectMaterialQuality)
}
