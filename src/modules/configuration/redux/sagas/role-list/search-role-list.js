import { call, put, takeLatest } from 'redux-saga/effects'

import {
  SEARCH_ROLE_LIST_START,
  searchRoleListSuccess,
  searchRoleListFailed,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'

export const searchRoleListApi = (params) => {
  const uri = `/v1/users/user-role-settings/list`
  return api.get(uri, params)
}

function* doSearchRoleList(action) {
  try {
    const response = yield call(searchRoleListApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchRoleListSuccess(payload))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRoleListFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchRoleList() {
  yield takeLatest(SEARCH_ROLE_LIST_START, doSearchRoleList)
}
