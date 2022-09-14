import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmMaterialCategoryByIdFailed,
  confirmMaterialCategoryByIdSuccess,
  CONFIRM_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}/confirm`
  return api.put(uri)
}

function* doConfirmMaterialCategory(action) {
  try {
    const response = yield call(confirmMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmMaterialCategoryByIdSuccess(response.payload))

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
    yield put(confirmMaterialCategoryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmMaterialCategory() {
  yield takeLatest(CONFIRM_MATERIAL_CATEGORY_START, doConfirmMaterialCategory)
}
