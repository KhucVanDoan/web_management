import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateObjectCategoryFailed,
  updateObjectCategorySuccess,
  UPDATE_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateObjectCategoryApi = (params) => {
  /* @TODO update uri */

  const uri = `/v1/warehouses/bussiness-types/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateObjectCategory(action) {
  try {
    const response = yield call(updateObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateObjectCategorySuccess(response.results))

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
    yield put(updateObjectCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateObjectCategory() {
  yield takeLatest(UPDATE_OBJECT_CATEGORY_START, doUpdateObjectCategory)
}
