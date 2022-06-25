import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPalletsFailed,
  getPalletsSuccess,
  GET_PALLETS_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPalletsApi = (params) => {
  const uri = `/v1/items/pallets/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPallets(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getPalletsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getPalletsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPalletsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouses
 */
export default function* watchGetPallets() {
  yield takeLatest(GET_PALLETS_START, doGetPallets)
}
