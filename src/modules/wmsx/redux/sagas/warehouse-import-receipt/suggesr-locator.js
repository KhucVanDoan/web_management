import { call, put, takeLatest } from 'redux-saga/effects'

import {
  suggestLocatorsFailed,
  suggestLocatorsSuccess,
  SUGGEST_LOCATORS_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'

const suggestLocatorsApi = (payload) => {
  const uri = `/v1/items/item-warehouses/suggest-locators`
  return api.post(uri, payload)
}

function* doSuggestLocators(action) {
  try {
    const response = yield call(suggestLocatorsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(suggestLocatorsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      // addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      // addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(suggestLocatorsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchsuggestLocators() {
  yield takeLatest(SUGGEST_LOCATORS_START, doSuggestLocators)
}
