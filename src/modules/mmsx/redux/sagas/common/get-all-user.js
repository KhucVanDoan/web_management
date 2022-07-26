import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getUserListSuccess,
  getUserListFail,
  GET_USER_START,
} from '../../actions/common'

export const getAllUserList = () => {
  const url = `v1/mms/user/list`
  return api.get(url)
}

function* doGetAllUserList(action) {
  try {
    const response = yield call(getAllUserList)

    if (response.statusCode === 200) {
      yield put(getUserListSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(getUserListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllUser() {
  yield takeLatest(GET_USER_START, doGetAllUserList)
}
