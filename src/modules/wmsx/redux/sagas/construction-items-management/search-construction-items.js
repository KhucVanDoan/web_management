import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchConstructionItemsFailed,
  searchConstructionItemsSuccess,
  SEARCH_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'

export const searchConstructionItemsApi = (params) => {
  const uri = `/v1/sales/construction-categories/list`
  return api.get(uri, params)
}

function* doSearchConstructionItems(action) {
  try {
    const response = yield call(searchConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchConstructionItemsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchConstructionItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchConstructionItems() {
  yield takeLatest(SEARCH_CONSTRUCTION_ITEMS_START, doSearchConstructionItems)
}
