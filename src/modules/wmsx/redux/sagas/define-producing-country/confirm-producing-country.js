import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmProducingCountryByIdFailed,
  confirmProducingCountryByIdSuccess,
  CONFIRM_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmProducingCountryApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/${params}/confirm`
  return api.put(uri)
}

function* doConfirmProducingCountry(action) {
  try {
    const response = yield call(confirmProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmProducingCountryByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmProducingCountryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmProducingCountry() {
  yield takeLatest(CONFIRM_PRODUCING_COUNTRY_START, doConfirmProducingCountry)
}
