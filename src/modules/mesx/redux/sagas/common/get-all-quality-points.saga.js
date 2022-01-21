import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getQualityPointsFailed,
  getQualityPointsSuccess,
  GET_QUALITY_POINTS_START,
} from 'modules/mesx/redux/actions/common.action'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityPointsApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQualityPoints(action) {
  try {
    const response = yield call(getQualityPointsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQualityPointsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getQualityPointsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search QualityPoints
 */
export default function* watchGetQualityPoints() {
  yield takeLatest(GET_QUALITY_POINTS_START, doGetQualityPoints)
}
