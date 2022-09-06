import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchProducingCountryFailed,
  searchProducingCountrySuccess,
  SEARCH_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'

export const searchProducingCountryApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/list`
  return api.get(uri, params)
}

function* doSearchProducingCountry(action) {
  try {
    const response = yield call(searchProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchProducingCountrySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchProducingCountryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchProducingCountry() {
  yield takeLatest(SEARCH_PRODUCING_COUNTRY_START, doSearchProducingCountry)
}
