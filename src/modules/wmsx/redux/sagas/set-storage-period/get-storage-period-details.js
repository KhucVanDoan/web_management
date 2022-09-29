import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getStoragePeriodDetailsByIdFailed,
  getStoragePeriodDetailsByIdSuccess,
  GET_STORAGE_PERIOD_DETAILS_START,
} from '~/modules/wmsx/redux/actions/set-storage-period'
import { api } from '~/services/api'

const getStoragePeriodDetailsApi = (params) => {
  const uri = `/v1/warehouses/inventory-time-limits/${params}`
  return api.get(uri)
}

function* doGetStoragePeriodDetails(action) {
  try {
    const response = yield call(getStoragePeriodDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getStoragePeriodDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getStoragePeriodDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetStoragePeriodDetails() {
  yield takeLatest(GET_STORAGE_PERIOD_DETAILS_START, doGetStoragePeriodDetails)
}
