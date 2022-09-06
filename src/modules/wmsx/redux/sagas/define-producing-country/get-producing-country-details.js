import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProducingCountryDetailsByIdFailed,
  getProducingCountryDetailsByIdSuccess,
  GET_PRODUCING_COUNTRY_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'

const getProducingCountryDetailsApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/${params}`
  return api.get(uri)
}

function* doGetProducingCountryDetails(action) {
  try {
    const response = yield call(getProducingCountryDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProducingCountryDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProducingCountryDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetProducingCountryDetails() {
  yield takeLatest(
    GET_PRODUCING_COUNTRY_DETAILS_START,
    doGetProducingCountryDetails,
  )
}
