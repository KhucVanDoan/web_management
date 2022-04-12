import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getCheckListDetailByIdFail,
  getCheckListDetailByIdSuccess,
  GET_CHECK_LIST_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-check-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get check list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCheckListDetailApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCheckListDetail(action) {
  try {
    const response = yield call(getCheckListDetailApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getCheckListDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCheckListDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get check list details
 */
export default function* watchGetCheckListDetail() {
  yield takeLatest(GET_CHECK_LIST_DETAIL_START, doGetCheckListDetail)
}
