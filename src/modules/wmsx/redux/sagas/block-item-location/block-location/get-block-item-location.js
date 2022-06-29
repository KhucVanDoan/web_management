import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBlockLocationDetailByIdFailed,
  getBlockLocationDetailByIdSuccess,
  GET_BLOCK_LOCATION_DETAIL_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'

/**
 * Get block location detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBlockLocationDetailApi = (params) => {
  const uri = `/v1/warehouses/suspends/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBlockLocationDetail(action) {
  try {
    const response = yield call(getBlockLocationDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBlockLocationDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getBlockLocationDetailByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getBlockLocationDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetBlockLocationDetail() {
  yield takeLatest(GET_BLOCK_LOCATION_DETAIL_START, doGetBlockLocationDetail)
}
