import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseDetailsByIdFailed,
  getWarehouseDetailsByIdSuccess,
  GET_WAREHOUSE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-warehouse'
import { api } from '~/services/api'

const getWarehouseDetailsApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.get(uri)
}

function* doGetWarehouseDetails(action) {
  try {
    const response = yield call(getWarehouseDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseDetails() {
  yield takeLatest(GET_WAREHOUSE_DETAILS_START, doGetWarehouseDetails)
}
