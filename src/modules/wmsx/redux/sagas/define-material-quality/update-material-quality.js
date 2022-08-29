import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateMaterialQualityFailed,
  updateMaterialQualitySuccess,
  UPDATE_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateMaterialQuality(action) {
  try {
    const response = yield call(updateMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaterialQualitySuccess(response.results))

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
    yield put(updateMaterialQualityFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateMaterialQuality() {
  yield takeLatest(UPDATE_MATERIAL_QUALITY_START, doUpdateMaterialQuality)
}
