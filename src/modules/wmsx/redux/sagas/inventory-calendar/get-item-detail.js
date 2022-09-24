import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemFailed,
  getItemSuccess,
  GET_ITEM_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getItemDetailsApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/items`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemDetails(action) {
  try {
    const response = yield call(getItemDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItem() {
  yield takeLatest(GET_ITEM_START, doGetItemDetails)
}
