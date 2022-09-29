import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchStoragePeriodsFailed,
  searchStoragePeriodsSuccess,
  SEARCH_STORAGE_PERIODS_START,
} from '~/modules/wmsx/redux/actions/set-storage-period'
import { api } from '~/services/api'

export const searchStoragePeriodsApi = (params) => {
  const uri = `/v1/warehouses/inventory-time-limits/list`
  return api.get(uri, params)
}

function* doSearchStoragePeriods(action) {
  try {
    const response = yield call(searchStoragePeriodsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchStoragePeriodsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchStoragePeriodsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchStoragePeriods() {
  yield takeLatest(SEARCH_STORAGE_PERIODS_START, doSearchStoragePeriods)
}
