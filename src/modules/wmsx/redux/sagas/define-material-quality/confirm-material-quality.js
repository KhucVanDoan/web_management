import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmMaterialQualityByIdFailed,
  confirmMaterialQualityByIdSuccess,
  CONFIRM_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/${params}/confirm`
  return api.put(uri)
}

function* doConfirmMaterialQuality(action) {
  try {
    const response = yield call(confirmMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmMaterialQualityByIdSuccess(response.payload))

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
    yield put(confirmMaterialQualityByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmMaterialQuality() {
  yield takeLatest(CONFIRM_MATERIAL_QUALITY_START, doConfirmMaterialQuality)
}
