import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailSuppliesCategoryFail,
  GET_SUPPLIES_CATEGORY_START,
  getDetailSuppliesCategorySuccess,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'

const getSuppliesCategory = (params) => {
  const url = `v1/mms/supply-groups/${params}`
  return api.get(url)
}

function* doGetSuppliesCategory(action) {
  try {
    const response = yield call(getSuppliesCategory, action.payload)

    if (response.statusCode === 200) {
      yield put(getDetailSuppliesCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSuppliesCategoryDetail() {
  yield takeLatest(GET_SUPPLIES_CATEGORY_START, doGetSuppliesCategory)
}
