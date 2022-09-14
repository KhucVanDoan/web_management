import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteMaterialCategoryFailed,
  deleteMaterialCategorySuccess,
  DELETE_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}`
  return api.delete(uri)
}

function* doDeleteMaterialCategory(action) {
  try {
    const response = yield call(deleteMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMaterialCategorySuccess(response.results))

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
    yield put(deleteMaterialCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteMaterialCategory() {
  yield takeLatest(DELETE_MATERIAL_CATEGORY_START, doDeleteMaterialCategory)
}
