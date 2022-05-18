import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchQualityPointsSuccess,
  searchQualityPointsFailed,
  SEARCH_QUALITY_POINTS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchQualityPointsApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchQualityPoints(action) {
  try {
    const response = yield call(searchQualityPointsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchQualityPointsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchQualityPointsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search boms
 */
export default function* watchSearchQualityPoints() {
  yield takeLatest(SEARCH_QUALITY_POINTS_START, doSearchQualityPoints)
}
