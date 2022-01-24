import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchItemsFailed,
  searchItemsSuccess,
  SEARCH_ITEMS_START,
} from '~/modules/mesx/redux/actions/define-item.action'
import { api } from '~/services/api'

/**
 * Search item API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchItemsApi = (params) => {
  const uri = `/v1/items/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchItems(action) {
  try {
    const response = yield call(searchItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchItemsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search items
 */
export default function* watchSearchItems() {
  yield takeLatest(SEARCH_ITEMS_START, doSearchItems)
}
