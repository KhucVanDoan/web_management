import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchItemGroupsFailed,
  searchItemGroupsSuccess,
  SEARCH_ITEM_GROUPS_START,
} from '~/modules/database/redux/actions/item-group-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchItemGroupsApi = (params) => {
  const uri = `/v1/items/item-group-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchItemGroups(action) {
  try {
    const response = yield call(searchItemGroupsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchItemGroupsSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchItemGroupsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchItemGroups() {
  yield takeLatest(SEARCH_ITEM_GROUPS_START, doSearchItemGroups)
}
