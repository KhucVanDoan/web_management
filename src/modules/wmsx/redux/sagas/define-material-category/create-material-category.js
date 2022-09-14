import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createMaterialCategoryFailed,
  createMaterialCategorySuccess,
  CREATE_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createMaterialCategoryApi = (body) => {
  const uri = `/v1/items/item-type-settings/create/tree`
  return api.post(uri, body)
}

function* doCreateMaterialCategory(action) {
  try {
    const response = yield call(createMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaterialCategorySuccess(response.data))

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
    yield put(createMaterialCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateMaterialCategory() {
  yield takeLatest(CREATE_MATERIAL_CATEGORY_START, doCreateMaterialCategory)
}
