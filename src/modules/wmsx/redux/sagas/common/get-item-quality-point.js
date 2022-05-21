import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemQualityPointFailed,
  getItemQualityPointSuccess,
  WMSX_GET_ITEM_QUALITY_POINT_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * get so export details
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemQualityPointApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemQualityPoint(action) {
  try {
    const response = yield call(getItemQualityPointApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getItemQualityPointSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemQualityPointFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get so export detail
 */
export default function* watchGetItemQualityPoint() {
  yield takeLatest(WMSX_GET_ITEM_QUALITY_POINT_START, doGetItemQualityPoint)
}
