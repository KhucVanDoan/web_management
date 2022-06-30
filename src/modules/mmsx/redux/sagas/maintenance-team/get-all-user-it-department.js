import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAllUserItDepartmentFail,
  getAllUserItDepartmentSuccess,
  GET_ALL_USER_IT_DEPARTMENT_START,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'

export const getAllUserItDepartmentApi = () => {
  const url = `v1/mms/maintenance-team/users/list`
  return api.get(url)
}

function* doGetAllUserItDepartment(action) {
  try {
    const response = yield call(getAllUserItDepartmentApi)

    if (response.statusCode === 200) {
      yield put(getAllUserItDepartmentSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(getAllUserItDepartmentFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllUserItDepartment() {
  yield takeLatest(GET_ALL_USER_IT_DEPARTMENT_START, doGetAllUserItDepartment)
}
