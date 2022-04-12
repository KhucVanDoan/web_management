import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getErrorGroupDetailByIdFail,
  getErrorGroupDetailByIdSuccess,
  GET_ERROR_GROUP_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-error-group'
import { api } from '~/services/api'

/**
 * Get detail Error Group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getErrorGroupDetailApi = (params) => {
  const uri = `/v1/quality-controls/error-groups/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorGroupDetail(action) {
  try {
    const response = yield call(getErrorGroupDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getErrorGroupDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getErrorGroupDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch get Error Group detail
 */
export default function* watchGetErrorGroupDetail() {
  yield takeLatest(GET_ERROR_GROUP_DETAIL_START, doGetErrorGroupDetail)
}
