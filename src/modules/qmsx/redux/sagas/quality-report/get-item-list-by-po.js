import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ITEM_LIST_BY_PO_START,
  getItemListByPoFail,
  getItemListByPoSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Get env item list by PO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemListByPoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-item-by-po/${params.poId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemListByPo(action) {
  try {
    const response = yield call(getItemListByPoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getItemListByPoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getItemListByPoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Get env item list by MO
 */
export default function* watchGetItemListByPo() {
  yield takeLatest(GET_ITEM_LIST_BY_PO_START, doGetItemListByPo)
}
