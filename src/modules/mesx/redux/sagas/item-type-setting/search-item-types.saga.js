import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchItemTypesFailed,
  searchItemTypesSuccess,
  SEARCH_ITEM_TYPES_START,
} from '~/modules/mesx/redux/actions/item-type-setting.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchItemTypesApi = (params) => {
  const uri = `/v1/items/item-type-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchItemTypes(action) {
  try {
    const response = yield call(searchItemTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchItemTypesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchItemTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchItemTypes() {
  yield takeLatest(SEARCH_ITEM_TYPES_START, doSearchItemTypes)
}
