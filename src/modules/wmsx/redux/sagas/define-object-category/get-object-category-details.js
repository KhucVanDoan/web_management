import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getObjectCategoryDetailsByIdFailed,
  getObjectCategoryDetailsByIdSuccess,
  GET_OBJECT_CATEGORY_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-object-category'
import { api } from '~/services/api'

const getObjectCategoryDetailsApi = (params) => {
  /* @TODO update uri */

  const uri = `/v1/warehouses/bussiness-types/${params}`
  return api.get(uri)
}

function* doGetObjectCategoryDetails(action) {
  try {
    const response = yield call(getObjectCategoryDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getObjectCategoryDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getObjectCategoryDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetObjectCategoryDetails() {
  yield takeLatest(
    GET_OBJECT_CATEGORY_DETAILS_START,
    doGetObjectCategoryDetails,
  )
}
