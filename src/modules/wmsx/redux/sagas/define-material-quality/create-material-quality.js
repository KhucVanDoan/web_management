import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createMaterialQualityFailed,
  createMaterialQualitySuccess,
  CREATE_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createMaterialQualityApi = (body) => {
  const uri = `/v1/items/item-qualities/create`
  return api.post(uri, body)
}

function* doCreateMaterialQuality(action) {
  try {
    const response = yield call(createMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaterialQualitySuccess(response.data))

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
    yield put(createMaterialQualityFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateMaterialQuality() {
  yield takeLatest(CREATE_MATERIAL_QUALITY_START, doCreateMaterialQuality)
}
