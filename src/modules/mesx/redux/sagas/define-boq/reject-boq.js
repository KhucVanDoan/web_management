import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectBOQByIdFailed,
  rejectBOQByIdSuccess,
  REJECT_BOQ_START,
} from '~/modules/mesx/redux/actions/define-boq'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject boq
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectBOQApi = (params) => {
  const uri = `/v1/produces/boqs/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectBOQ(action) {
  try {
    const response = yield call(rejectBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectBOQByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectBOQByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectBOQ() {
  yield takeLatest(REJECT_BOQ_START, doRejectBOQ)
}
