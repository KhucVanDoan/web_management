import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createProducingCountryFailed,
  createProducingCountrySuccess,
  CREATE_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createProducingCountryApi = (body) => {
  const uri = `/v1/items/manufacturing-countries/create`
  return api.post(uri, body)
}

function* doCreateProducingCountry(action) {
  try {
    const response = yield call(createProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createProducingCountrySuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createProducingCountryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateProducingCountry() {
  yield takeLatest(CREATE_PRODUCING_COUNTRY_START, doCreateProducingCountry)
}
