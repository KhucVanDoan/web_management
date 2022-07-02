import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSuppliesSuccess,
  createSuppliesFail,
  CREATE_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const createSuppliesApi = (params) => {
  const url = `v1/mms/supplies`
  return api.post(url, params)
}

function* doCreateSupplies(action) {
  try {
    const response = yield call(createSuppliesApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createSuppliesSuccess())

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(createSuppliesFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateSupplies() {
  yield takeLatest(CREATE_SUPPLIES_START, doCreateSupplies)
}
