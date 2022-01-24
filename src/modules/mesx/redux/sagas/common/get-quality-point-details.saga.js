import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getQualityPointDetailsByIdSuccess,
  getQualityPointDetailsByIdFailed,
  GET_QUALITY_POINT_DETAILS_START,
} from '~/modules/mesx/redux/actions/common.action'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityPointDetailsApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQualityPointDetails(action) {
  try {
    const response = yield call(getQualityPointDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQualityPointDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getQualityPointDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search boms
 */
export default function* watchGetQualityPointDetails() {
  yield takeLatest(GET_QUALITY_POINT_DETAILS_START, doGetQualityPointDetails)
}
