import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ITEM_LIST_BY_PRO_START,
  getItemListByProFail,
  getItemListByProSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Get env item list by PRO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemListByProApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-item-by-pro/${params.proId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemListByPro(action) {
  try {
    const response = yield call(getItemListByProApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getItemListByProSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getItemListByProFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Get env item list by MO
 */
export default function* watchGetItemListByPro() {
  yield takeLatest(GET_ITEM_LIST_BY_PRO_START, doGetItemListByPro)
}
