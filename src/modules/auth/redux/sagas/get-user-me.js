import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getUserMeFailed,
  getUserMeSuccess,
  GET_USER_ME_START,
} from '../actions/auth'

const getUserMeApi = () => {
  const uri = '/v1/users/me'
  return api.get(uri)
}

function* doGetUserMe(action) {
  try {
    const response = yield call(getUserMeApi)

    if (response?.statusCode === 200) {
      yield put(getUserMeSuccess(response.data))

      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUserMeFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetUserMe() {
  yield takeLatest(GET_USER_ME_START, doGetUserMe)
}
