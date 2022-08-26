import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectObjectCategoryByIdFailed,
  rejectObjectCategoryByIdSuccess,
  REJECT_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectObjectCategoryApi = (params) => {
  const uri = `/v1/items/object-categories/${params}/reject`
  return api.put(uri)
}

function* doRejectObjectCategory(action) {
  try {
    const response = yield call(rejectObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectObjectCategoryByIdSuccess(response.payload))

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
    yield put(rejectObjectCategoryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectObjectCategory() {
  yield takeLatest(REJECT_OBJECT_CATEGORY_START, doRejectObjectCategory)
}
