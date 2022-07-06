import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_MAINTAIN_REQUEST_START,
  getMaintainRequestSuccess,
  getMaintainRequestFail,
} from '~/modules/mmsx/redux/actions/maintain-request'
import { api } from '~/services/api'

const getMaintainRequest = (params) => {
  const url = `v1/mms/maintain-requests`
  return api.get(url, params)
}

function* doGetMaintainRequest(action) {
  try {
    const response = yield call(getMaintainRequest, action?.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainRequestSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaintainRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetMaintainRequest() {
  yield takeLatest(GET_MAINTAIN_REQUEST_START, doGetMaintainRequest)
}
