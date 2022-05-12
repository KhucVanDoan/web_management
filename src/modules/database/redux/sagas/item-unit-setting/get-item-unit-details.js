import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemUnitDetailsByIdFailed,
  getItemUnitDetailsByIdSuccess,
  GET_ITEM_UNIT_DETAILS_START,
} from '~/modules/database/redux/actions/item-unit-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemUnitDetailsApi = (params) => {
  const uri = `/v1/items/item-unit-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemUnitDetails(action) {
  try {
    const response = yield call(getItemUnitDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemUnitDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemUnitDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemUnitDetails() {
  yield takeLatest(GET_ITEM_UNIT_DETAILS_START, doGetItemUnitDetails)
}
