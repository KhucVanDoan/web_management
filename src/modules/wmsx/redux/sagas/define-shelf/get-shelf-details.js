import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getShelfDetailsByIdFailed,
  getShelfDetailsByIdSuccess,
  GET_SHELF_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'

const getShelfDetailsApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}`
  return api.get(uri)
}

function* doGetShelfDetails(action) {
  try {
    const response = yield call(getShelfDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getShelfDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getShelfDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetShelfDetails() {
  yield takeLatest(GET_SHELF_DETAILS_START, doGetShelfDetails)
}
