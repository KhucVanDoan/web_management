import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMaterialCategoryDetailsByIdFailed,
  getMaterialCategoryDetailsByIdSuccess,
  GET_MATERIAL_CATEGORY_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'

const getMaterialCategoryDetailsApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}`
  return api.get(uri)
}

function* doGetMaterialCategoryDetails(action) {
  try {
    const response = yield call(getMaterialCategoryDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMaterialCategoryDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaterialCategoryDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetMaterialCategoryDetails() {
  yield takeLatest(
    GET_MATERIAL_CATEGORY_DETAILS_START,
    doGetMaterialCategoryDetails,
  )
}
