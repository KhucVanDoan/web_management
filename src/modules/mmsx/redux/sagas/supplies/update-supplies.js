import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateSuppliesSuccess,
  updateSuppliesFail,
  UPDATE_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const updateSuppliesApi = (params) => {
  const url = `v1/mms/supplies/${params.id}`
  return api.put(url, params.body)
}

function* doUpdateSupplies(action) {
  try {
    const response = yield call(updateSuppliesApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateSuppliesSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateSuppliesFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateSupplies() {
  yield takeLatest(UPDATE_SUPPLIES_START, doUpdateSupplies)
}
