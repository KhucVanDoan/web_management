import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getListItemDetailReciptSuccess,
  getListItemDetailReciptFailed,
  GET_LIST_ITEM_DETAIL_RECIPT_START,
} from '~/modules/wmsx/redux/actions/inventory-calendar'
import { api } from '~/services/api'

/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getItemDetailReciptApi = (id, params) => {
  const uri = `/v1/warehouses/inventories/${id}/item-inventory-quantity`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemDetailRecipt(action) {
  try {
    const response = yield call(getItemDetailReciptApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(getListItemDetailReciptSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListItemDetailReciptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchGetItemDetailRecipt() {
  yield takeLatest(GET_LIST_ITEM_DETAIL_RECIPT_START, doGetItemDetailRecipt)
}
