import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createObjectCategoryFailed,
  createObjectCategorySuccess,
  CREATE_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createObjectCategoryApi = (body) => {
  /* @TODO update uri */
  const uri = `/v1/warehouses/bussiness-types/create`
  return api.post(uri, body)
}

function* doCreateObjectCategory(action) {
  try {
    const response = yield call(createObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createObjectCategorySuccess(response.data))

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
    yield put(createObjectCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateObjectCategory() {
  yield takeLatest(CREATE_OBJECT_CATEGORY_START, doCreateObjectCategory)
}
