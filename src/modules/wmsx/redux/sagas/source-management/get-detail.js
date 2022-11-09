import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailSourceManagementByIdFailed,
  getDetailSourceManagementByIdSuccess,
  GET_SOURCE_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/source-management'
import { api } from '~/services/api'

export const getSourceManagementApi = (params) => {
  const uri = `/v1/sales/sources/${params}`
  return api.get(uri)
}

function* doGetSourceManagement(action) {
  try {
    const response = yield call(getSourceManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailSourceManagementByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailSourceManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSourceManagement() {
  yield takeLatest(GET_SOURCE_MANAGEMENT_START, doGetSourceManagement)
}
