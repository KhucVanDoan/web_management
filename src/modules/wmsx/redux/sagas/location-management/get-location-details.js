import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getLocationDetailsByIdFailed,
  getLocationDetailsByIdSuccess,
  GET_LOCATION_DETAILS_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'

const getLocationDetailsApi = (params) => {
  const uri = `/v1/warehouse-layouts/locators/${params}`
  return api.get(uri)
}

function* doGetLocationDetails(action) {
  try {
    const response = yield call(getLocationDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getLocationDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getLocationDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetLocationDetails() {
  yield takeLatest(GET_LOCATION_DETAILS_START, doGetLocationDetails)
}
