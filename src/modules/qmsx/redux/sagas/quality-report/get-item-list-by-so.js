import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ITEM_LIST_BY_SO_START,
  getItemListBySoFail,
  getItemListBySoSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Get env item list by SO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemListBySoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-item-by-so/${params.soId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemListBySo(action) {
  try {
    const response = yield call(getItemListBySoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getItemListBySoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getItemListBySoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Get env item list by MO
 */
export default function* watchGetItemListBySo() {
  yield takeLatest(GET_ITEM_LIST_BY_SO_START, doGetItemListBySo)
}
