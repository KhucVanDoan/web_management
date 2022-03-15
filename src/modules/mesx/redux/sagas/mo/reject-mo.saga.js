import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMOByIdFailed,
  rejectMOByIdSuccess,
  REJECT_MO_START,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject boq
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectMOApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectMO(action) {
  try {
    const response = yield call(rejectMOApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectMOByIdSuccess(response.payload))

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
    yield put(rejectMOByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectMO() {
  yield takeLatest(REJECT_MO_START, doRejectMO)
}
