import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteProducingCountryFailed,
  deleteProducingCountrySuccess,
  DELETE_PRODUCING_COUNTRY_START,
} from '~/modules/wmsx/redux/actions/define-producing-country'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteProducingCountryApi = (params) => {
  const uri = `/v1/items/manufacturing-countries/${params}`
  return api.delete(uri)
}

function* doDeleteProducingCountry(action) {
  try {
    const response = yield call(deleteProducingCountryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteProducingCountrySuccess(response.results))

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
    yield put(deleteProducingCountryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteProducingCountry() {
  yield takeLatest(DELETE_PRODUCING_COUNTRY_START, doDeleteProducingCountry)
}
