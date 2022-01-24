import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemTypeDetailsByIdFailed,
  getItemTypeDetailsByIdSuccess,
  GET_ITEM_TYPE_DETAILS_START,
} from '~/modules/mesx/redux/actions/item-type-setting.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemTypeDetailsApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemTypeDetails(action) {
  try {
    const response = yield call(getItemTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemTypeDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemTypeDetails() {
  yield takeLatest(GET_ITEM_TYPE_DETAILS_START, doGetItemTypeDetails)
}
