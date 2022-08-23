import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchConstructionsFailed,
  searchConstructionsSuccess,
  SEARCH_CONSTRUCTIONS_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'

const searchConstructionsApi = (params) => {
  const uri = `/v1/sales/constructions/list`
  return api.get(uri, params)
}

function* doSearchConstructions(action) {
  try {
    const response = yield call(searchConstructionsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchConstructionsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchConstructionsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchConstructions() {
  yield takeLatest(SEARCH_CONSTRUCTIONS_START, doSearchConstructions)
}
