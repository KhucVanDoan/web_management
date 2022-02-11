import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemGroupsFailed,
  getItemGroupsSuccess,
  GET_ITEM_GROUPS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemGroupsApi = (params) => {
  const uri = `/v1/items/item-group-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemGroups(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getItemGroupsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getItemGroupsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemGroupsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemGroups() {
  yield takeLatest(GET_ITEM_GROUPS_START, doGetItemGroups)
}
