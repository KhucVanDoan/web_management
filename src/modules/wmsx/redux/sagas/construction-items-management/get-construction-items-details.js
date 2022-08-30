import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getConstructionItemsDetailsByIdFailed,
  getConstructionItemsDetailsByIdSuccess,
  GET_CONSTRUCTION_ITEMS_DETAILS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'

const getConstructionItemsDetailsApi = (params) => {
  const uri = `/v1/sales/construction-categories/${params}`
  return api.get(uri)
}

function* doGetConstructionItemsDetails(action) {
  try {
    const response = yield call(getConstructionItemsDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getConstructionItemsDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getConstructionItemsDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetConstructionItemsDetails() {
  yield takeLatest(
    GET_CONSTRUCTION_ITEMS_DETAILS_START,
    doGetConstructionItemsDetails,
  )
}
