import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchShelfFailed,
  searchShelfSuccess,
  SEARCH_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'

export const searchShelfApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/list`
  return api.get(uri, params)
}

function* doSearchShelf(action) {
  try {
    const response = yield call(searchShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchShelfSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchShelf() {
  yield takeLatest(SEARCH_SHELF_START, doSearchShelf)
}
