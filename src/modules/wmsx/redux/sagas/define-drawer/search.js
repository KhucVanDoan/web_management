import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchDrawerFailed,
  searchDrawerSuccess,
  SEARCH_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'

export const searchDrawerApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/list`
  return api.get(uri, params)
}

function* doSearchDrawer(action) {
  try {
    const response = yield call(searchDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDrawerSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDrawerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchDrawer() {
  yield takeLatest(SEARCH_DRAWER_START, doSearchDrawer)
}
