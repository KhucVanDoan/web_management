import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCauseGroupDetailByIdFail,
  getCauseGroupDetailByIdSuccess,
  GET_CAUSE_GROUP_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-cause-group'
import { api } from '~/services/api'

/**
 * Get detail cause group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCauseGroupDetailApi = (params) => {
  const uri = `/v1/quality-controls/cause-groups/${params?.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCauseGroupDetail(action) {
  try {
    const response = yield call(getCauseGroupDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCauseGroupDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCauseGroupDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch get detail cause group
 */
export default function* watchGetCauseGroupDetail() {
  yield takeLatest(GET_CAUSE_GROUP_DETAIL_START, doGetCauseGroupDetail)
}
