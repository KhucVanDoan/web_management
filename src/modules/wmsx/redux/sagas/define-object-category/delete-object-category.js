import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteObjectCategoryFailed,
  deleteObjectCategorySuccess,
  DELETE_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteObjectCategoryApi = (params) => {
  const uri = `/v1/items/object-categories/${params}`
  return api.delete(uri)
}

function* doDeleteObjectCategory(action) {
  try {
    const response = yield call(deleteObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteObjectCategorySuccess(response.results))

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
    yield put(deleteObjectCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteObjectCategory() {
  yield takeLatest(DELETE_OBJECT_CATEGORY_START, doDeleteObjectCategory)
}
