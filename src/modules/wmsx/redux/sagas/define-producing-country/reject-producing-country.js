import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectProducingCountryByIdFailed,
  rejectProducingCountryByIdSuccess,
  REJECT_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectProducingCountryApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/${params}/reject`
  return api.put(uri)
}

function* doRejectProducingCountry(action) {
  try {
    const response = yield call(rejectProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectProducingCountryByIdSuccess(response.payload))

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
    yield put(rejectProducingCountryByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectProducingCountry() {
  yield takeLatest(REJECT_PRODUCING_COUNTRY_START, doRejectProducingCountry)
}
