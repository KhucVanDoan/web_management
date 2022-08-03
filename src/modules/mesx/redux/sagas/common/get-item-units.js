import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemUnitsFailed,
  getItemUnitsSuccess,
  GET_ITEM_UNITS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemUnitsApi = () => {
  const uri = `/v1/users/ping`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemUnits(action) {
  try {
    const response = yield call(getItemUnitsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemUnitsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemUnitsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemUnits() {
  yield takeLatest(GET_ITEM_UNITS_START, doGetItemUnits)
}
