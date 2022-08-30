import { call, put, takeLatest } from 'redux-saga/effects'

import {
  SEARCH_DEPARTMENT_LIST_START,
  searchDepartmentListSuccess,
  searchDepartmentListFailed,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'

export const searchDepartmentListApi = (params) => {
  const uri = `/v1/users/department-settings/list`
  return api.get(uri, params)
}

function* doSearchDepartmentList(action) {
  try {
    const response = yield call(searchDepartmentListApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDepartmentListSuccess(payload))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDepartmentListFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchDepartmentList() {
  yield takeLatest(SEARCH_DEPARTMENT_LIST_START, doSearchDepartmentList)
}
