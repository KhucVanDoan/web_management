import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_MAINTAIN_REQUEST_DETAIL_START,
  getMaintainRequestDetailSuccess,
  getMaintainRequestDetailFail,
} from '~/modules/mmsx/redux/actions/maintain-request'
import { api } from '~/services/api'

const getMaintainRequestDetail = (params) => {
  const url = `v1/mms/maintain-requests/${params}`
  return api.get(url)
}

function* doGetMaintainRequestDetail(action) {
  try {
    const response = yield call(getMaintainRequestDetail, action.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainRequestDetailSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaintainRequestDetailFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetMaintainRequestDetail() {
  yield takeLatest(
    GET_MAINTAIN_REQUEST_DETAIL_START,
    doGetMaintainRequestDetail,
  )
}
