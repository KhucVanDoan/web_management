import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmSuppliesFail,
  confirmSuppliesSuccess,
  CONFIRM_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmSuppliesApi = (params) => {
  const url = `v1/mms/supplies/${params}/confirmed`
  return api.put(url)
}

function* doConfirmSupplies(action) {
  try {
    const response = yield call(confirmSuppliesApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmSuppliesSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSuppliesFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmSupplies() {
  yield takeLatest(CONFIRM_SUPPLIES_START, doConfirmSupplies)
}
