import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateMaterialCategoryFailed,
  updateMaterialCategorySuccess,
  UPDATE_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateMaterialCategory(action) {
  try {
    const response = yield call(updateMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaterialCategorySuccess(response.results))

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
    yield put(updateMaterialCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateMaterialCategory() {
  yield takeLatest(UPDATE_MATERIAL_CATEGORY_START, doUpdateMaterialCategory)
}
