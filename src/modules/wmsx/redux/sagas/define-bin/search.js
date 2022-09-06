import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchBinFailed,
  searchBinSuccess,
  SEARCH_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'

export const searchBinApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/list`
  return api.get(uri, params)
}

function* doSearchBin(action) {
  try {
    const response = yield call(searchBinApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBinSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBinFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchBin() {
  yield takeLatest(SEARCH_BIN_START, doSearchBin)
}
