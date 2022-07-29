import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemsFailed,
  getItemsSuccess,
  WMSX_GET_ITEMS_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get all items API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getItemsApi = (params) => {
  const uri = `/v1/items/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItems(action) {
  try {
    const response = yield call(getItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all items
 */
export default function* watchGetItems() {
  yield takeLatest(WMSX_GET_ITEMS_START, doGetItems)
}
