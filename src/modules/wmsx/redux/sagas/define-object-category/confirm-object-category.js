import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmObjectCategoryByIdFailed,
  confirmObjectCategoryByIdSuccess,
  CONFIRM_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmObjectCategoryApi = (params) => {
  /* @TODO update uri */
  const uri = `/v1/warehouses/bussiness-types/${params}/confirm`
  return api.put(uri)
}

function* doConfirmObjectCategory(action) {
  try {
    const response = yield call(confirmObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmObjectCategoryByIdSuccess(response.payload))

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
    yield put(confirmObjectCategoryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmObjectCategory() {
  yield takeLatest(CONFIRM_OBJECT_CATEGORY_START, doConfirmObjectCategory)
}
