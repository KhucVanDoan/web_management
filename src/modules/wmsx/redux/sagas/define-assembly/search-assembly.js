import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchAssemblyFailed,
  searchAssemblySuccess,
  SEARCH_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'

export const searchAssemblyApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/list`
  return api.get(uri, params)
}

function* doSearchAssembly(action) {
  try {
    const response = yield call(searchAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchAssemblySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchAssemblyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchAssembly() {
  yield takeLatest(SEARCH_ASSEMBLY_START, doSearchAssembly)
}
