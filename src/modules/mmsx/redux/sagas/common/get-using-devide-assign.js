import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getUsingDeviceAssignFailed,
  getUsingDeviceAssignSuccess,
  GET_USING_DEVICE_ASSIGN_START,
} from '../../actions/common'

//Lấy tất cả những bản ghi Phân công thiết bị - mà có trạng thái là đang sử dụng
const getUsingDeviceAssignApi = () => {
  const url = `v1/mms/device-assignment/serials-in-use`
  return api.get(url)
}

function* doGetUsingDeviceAssign(action) {
  try {
    const response = yield call(getUsingDeviceAssignApi, action.payload)
    if (response?.statusCode === 200) {
      yield put(getUsingDeviceAssignSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUsingDeviceAssignFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetUsingDeviceAssign() {
  yield takeLatest(GET_USING_DEVICE_ASSIGN_START, doGetUsingDeviceAssign)
}
