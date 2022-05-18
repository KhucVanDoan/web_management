import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchBlocksFailed,
  searchBlocksSuccess,
  SEARCH_BLOCKS_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBlocksApi = (params) => {
  const uri = `/v1/items/blocks/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBlocks(action) {
  try {
    const response = yield call(searchBlocksApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBlocksSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBlocksFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchBlocks() {
  yield takeLatest(SEARCH_BLOCKS_START, doSearchBlocks)
}
