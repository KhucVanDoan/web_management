import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBlocksFailed,
  getBlocksSuccess,
  WMSX_GET_BLOCKS_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get all items API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getBlocksApi = (params) => {
  const uri = `/v1/items/blocks/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBlocks(action) {
  try {
    const response = yield call(getBlocksApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBlocksSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBlocksFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all items
 */
export default function* watchGetBlocks() {
  yield takeLatest(WMSX_GET_BLOCKS_START, doGetBlocks)
}
