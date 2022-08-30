import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchObjectCategoryFailed,
  searchObjectCategorySuccess,
  SEARCH_OBJECT_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'

export const searchObjectCategoryApi = (params) => {
  const uri = `/v1/items/object-categories/list`
  return api.get(uri, params)
}

function* doSearchObjectCategory(action) {
  try {
    const response = yield call(searchObjectCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchObjectCategorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchObjectCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchObjectCategory() {
  yield takeLatest(SEARCH_OBJECT_CATEGORY_START, doSearchObjectCategory)
}
