import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBlockItemDetailByIdFailed,
  getBlockItemDetailByIdSuccess,
  GET_BLOCK_ITEM_DETAIL_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'

/**
 * Get block item detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBlockItemDetailApi = (params) => {
  const uri = `/v1/items/suspends/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBlockItemDetail(action) {
  try {
    const response = yield call(getBlockItemDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBlockItemDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getBlockItemDetailByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getBlockItemDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBlockItemDetail() {
  yield takeLatest(GET_BLOCK_ITEM_DETAIL_START, doGetBlockItemDetail)
}
