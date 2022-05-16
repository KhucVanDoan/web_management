import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemGroupDetailsByIdFailed,
  getItemGroupDetailsByIdSuccess,
  GET_ITEM_GROUP_DETAILS_START,
} from '~/modules/database/redux/actions/item-group-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemGroupDetailsApi = (params) => {
  const uri = `/v1/items/item-group-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemGroupDetails(action) {
  try {
    const response = yield call(getItemGroupDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemGroupDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemGroupDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemGroupDetails() {
  yield takeLatest(GET_ITEM_GROUP_DETAILS_START, doGetItemGroupDetails)
}
