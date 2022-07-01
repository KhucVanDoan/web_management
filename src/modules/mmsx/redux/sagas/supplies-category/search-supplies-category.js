import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchListSuppliesCategorySuccess,
  searchListSuppliesCategoryFail,
  SEARCH_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'

const searchSuppliesCategory = (params) => {
  const url = `v1/mms/supply-groups/list`
  return api.get(url, params)
}

function* doSearchSuppliesCategory(action) {
  try {
    const response = yield call(searchSuppliesCategory, action.payload)
    if (response.statusCode === 200) {
      yield put(searchListSuppliesCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchListSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchSuppliesCategory() {
  yield takeLatest(SEARCH_SUPPLIES_CATEGORY_START, doSearchSuppliesCategory)
}
