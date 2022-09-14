import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMaterialCategoryFailed,
  searchMaterialCategorySuccess,
  SEARCH_MATERIAL_CATEGORY_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'

export const searchMaterialCategoryApi = (params) => {
  const uri = `/v1/items/item-type-settings/list`
  return api.get(uri, params)
}

function* doSearchMaterialCategory(action) {
  try {
    const response = yield call(searchMaterialCategoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMaterialCategorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMaterialCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchMaterialCategory() {
  yield takeLatest(SEARCH_MATERIAL_CATEGORY_START, doSearchMaterialCategory)
}
