import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBomsFailed,
  getBomsSuccess,
  GET_BOMS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBomsApi = (params) => {
  const uri = `/v1/produces/boms/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBoms(action) {
  try {
    const response = yield call(getBomsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBomsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search boms
 */
export default function* watchGetBoms() {
  yield takeLatest(GET_BOMS_START, doGetBoms)
}
