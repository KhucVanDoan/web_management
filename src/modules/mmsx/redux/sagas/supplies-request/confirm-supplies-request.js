import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_SUPPLIES_REQUEST_START,
  confirmSuppliesRequestSuccess,
  confirmSuppliesRequestFail,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const confirmSuppliesRequestApi = (params) => {
  const url = `v1/mms/supply-request/${params}/confirm`
  return api.put(url)
}

function* doComfirmSuppliesRequest(action) {
  try {
    const response = yield call(confirmSuppliesRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmSuppliesRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSuppliesRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmSuppliesRequest() {
  yield takeLatest(CONFIRM_SUPPLIES_REQUEST_START, doComfirmSuppliesRequest)
}
