import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateProducingCountryFailed,
  updateProducingCountrySuccess,
  UPDATE_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateProducingCountryApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateProducingCountry(action) {
  try {
    const response = yield call(updateProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateProducingCountrySuccess(response.results))

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
    yield put(updateProducingCountryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateProducingCountry() {
  yield takeLatest(UPDATE_PRODUCING_COUNTRY_START, doUpdateProducingCountry)
}
