import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ITEM_LIST_BY_MO_START,
  getItemListByMoFail,
  getItemListByMoSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Get env item list by MO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemListByMoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-list-item-by-manufacturing-order-id/${params.moId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemListByMo(action) {
  try {
    const response = yield call(getItemListByMoApi, action?.payload)

    if (response?.statusCode === 200) {
      const data = response?.data

      yield put(getItemListByMoSuccess(data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(data)
      }
    }
  } catch (error) {
    yield put(getItemListByMoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Get env item list by MO
 */
export default function* watchGetItemListByMo() {
  yield takeLatest(GET_ITEM_LIST_BY_MO_START, doGetItemListByMo)
}
