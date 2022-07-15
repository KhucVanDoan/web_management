import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getSuppliesRequestListFail,
  getSuppliesRequestListSuccess,
  GET_SUPPLIES_REQUEST_LIST_START,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const getSuppliesRequestListApi = (params) => {
  const url = `v1/mms/supply-request`
  return api.get(url, params)
}

function* doGetSuppliesRequestList(action) {
  try {
    const response = yield call(getSuppliesRequestListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getSuppliesRequestListSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getSuppliesRequestListFail())
    }
  } catch (error) {
    yield put(getSuppliesRequestListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSuppliesRequestList() {
  yield takeLatest(GET_SUPPLIES_REQUEST_LIST_START, doGetSuppliesRequestList)
}
