import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getSuppliesRequestDetailFail,
  getSuppliesRequestDetailSuccess,
  GET_SUPPLIES_REQUEST_DETAIL_START,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const getSuppliesRequestDetailApi = (params) => {
  const url = `v1/mms/supply-request/${params}`
  return api.get(url)
}

function* doGetSuppliesRequestDetail(action) {
  try {
    const response = yield call(getSuppliesRequestDetailApi, action.payload)

    if (response.statusCode === 200) {
      yield put(getSuppliesRequestDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSuppliesRequestDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSuppliesRequestDetail() {
  yield takeLatest(
    GET_SUPPLIES_REQUEST_DETAIL_START,
    doGetSuppliesRequestDetail,
  )
}
