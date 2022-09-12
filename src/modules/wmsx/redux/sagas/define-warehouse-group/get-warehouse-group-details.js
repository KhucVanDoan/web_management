import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseGroupDetailsByIdFailed,
  getWarehouseGroupDetailsByIdSuccess,
  GET_WAREHOUSE_GROUP_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'

const getWarehouseGroupDetailsApi = (params) => {
  const uri = `/v1/warehouses/warehouse-type-settings/${params}`
  return api.get(uri)
}

function* doGetWarehouseGroupDetails(action) {
  try {
    const response = yield call(getWarehouseGroupDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseGroupDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseGroupDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseGroupDetails() {
  yield takeLatest(
    GET_WAREHOUSE_GROUP_DETAILS_START,
    doGetWarehouseGroupDetails,
  )
}
