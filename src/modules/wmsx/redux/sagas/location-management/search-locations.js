import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchLocationsFailed,
  searchLocationsSuccess,
  SEARCH_LOCATIONS_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'

export const searchLocationsApi = (params) => {
  const uri = `/v1/warehouse-layouts/locators/list`
  return api.get(uri, params)
}

function* doSearchLocations(action) {
  try {
    const response = yield call(searchLocationsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchLocationsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchLocationsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchLocations() {
  yield takeLatest(SEARCH_LOCATIONS_START, doSearchLocations)
}
