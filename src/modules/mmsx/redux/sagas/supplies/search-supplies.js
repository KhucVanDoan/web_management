import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchListSuppliesSuccess,
  searchListSuppliesFail,
  SEARCH_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const searchSuppliesList = (params) => {
  const url = `v1/mms/supplies`
  return api.get(url, params)
}

function* doSearchSuppliesList(action) {
  try {
    const response = yield call(searchSuppliesList, action?.payload)

    if (response.statusCode === 200) {
      yield put(searchListSuppliesSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchListSuppliesFail())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchSearchSuppliesList() {
  yield takeLatest(SEARCH_SUPPLIES_START, doSearchSuppliesList)
}
