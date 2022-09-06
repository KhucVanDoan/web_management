import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPalletsEvenByItemFailed,
  getPalletsEvenByItemSuccess,
  WMSX_GET_PALLETS_EVEN_BY_ITEM_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getPalletsEvenByItemApi = (params) => {
  const uri = `/v1/items/pallets/${params}/evenly`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPalletsEvenByItem(action) {
  try {
    const response = yield call(getPalletsEvenByItemApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data,
      }
      yield put(getPalletsEvenByItemSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPalletsEvenByItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPalletsEvenByItem() {
  yield takeLatest(WMSX_GET_PALLETS_EVEN_BY_ITEM_START, doGetPalletsEvenByItem)
}
