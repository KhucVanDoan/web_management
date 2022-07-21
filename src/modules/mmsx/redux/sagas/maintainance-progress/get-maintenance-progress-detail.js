import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DETAIL_MAINTAINANCE_PROGRESS_START,
  getDetailMaintainanceProgressSuccess,
  getDetailMaintainanceProgressFail,
} from '~/modules/mmsx/redux/actions/maintainance-progress'
import { api } from '~/services/api'

/**
 * Search user API
 * @returns {Promise}
 */
const getDetailMaintainanceProgressApi = (id) => {
  const uri = `v1/mms/jobs/report/${id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailMaintainanceProgress(action) {
  try {
    const response = yield call(
      getDetailMaintainanceProgressApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailMaintainanceProgressSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailMaintainanceProgressFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailMaintainanceProgress() {
  yield takeLatest(
    GET_DETAIL_MAINTAINANCE_PROGRESS_START,
    doGetDetailMaintainanceProgress,
  )
}
