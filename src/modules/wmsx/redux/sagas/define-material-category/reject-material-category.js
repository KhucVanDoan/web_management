import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMaterialCategoryByIdFailed,
  rejectMaterialCategoryByIdSuccess,
  REJECT_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}/reject`
  return api.put(uri)
}

function* doRejectMaterialCategory(action) {
  try {
    const response = yield call(rejectMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectMaterialCategoryByIdSuccess(response.payload))

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
    yield put(rejectMaterialCategoryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectMaterialCategory() {
  yield takeLatest(REJECT_MATERIAL_CATEGORY_START, doRejectMaterialCategory)
}
