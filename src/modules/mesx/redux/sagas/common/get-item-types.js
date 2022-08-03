import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemTypesFailed,
  getItemTypesSuccess,
  GET_ITEM_TYPES_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemTypesApi = () => {
  const uri = `/v1/users/ping`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemTypes(action) {
  try {
    const response = yield call(getItemTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemTypesSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemTypes() {
  yield takeLatest(GET_ITEM_TYPES_START, doGetItemTypes)
}
