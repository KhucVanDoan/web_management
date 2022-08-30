import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchSourceManagementFailed,
  searchSourceManagementSuccess,
  SEARCH_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'

export const searchSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/list`
  return api.get(uri, params)
}

function* doSearchSourceManagement(action) {
  try {
    const response = yield call(searchSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchSourceManagementSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchSourceManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchSourceManagement() {
  yield takeLatest(SEARCH_SOURCE_MANAGEMENT_START, doSearchSourceManagement)
}
