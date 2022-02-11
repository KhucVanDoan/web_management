import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailsFailed,
  getDetailsSuccess,
  GET_DETAILS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailsApi = (params) => {
  const uri = `/v1/items/item-details/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetails(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getDetailsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getDetailsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetails() {
  yield takeLatest(GET_DETAILS_START, doGetDetails)
}
