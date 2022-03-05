import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMoItemsByIdFailed,
  getMoItemsByIdSuccess,
  GET_MO_ITEMS_START,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'

/**
 * Search MO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMoItemsApi = (params) => {
  const uri = `v1/produces/manufacturing-orders/${params}/plan/producing-steps/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMOItems(action) {
  try {
    const response = yield call(getMoItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMoItemsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMoItemsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMOItems() {
  yield takeLatest(GET_MO_ITEMS_START, doGetMOItems)
}
