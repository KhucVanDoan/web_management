import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getSuppliesSuccess,
  getSuppliesFail,
  GET_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const getDetailSupplies = (params) => {
  const url = `v1/mms/supplies/${params}`
  return api.get(url)
}

function* doGetDetailSupplies(action) {
  try {
    const response = yield call(getDetailSupplies, action.payload)
    if (response.statusCode === 200) {
      yield put(getSuppliesSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSuppliesFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDetailSupplies() {
  yield takeLatest(GET_SUPPLIES_START, doGetDetailSupplies)
}
