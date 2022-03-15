import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  extendDeadlineSuccess,
  extendDeadlineFailed,
  EXTEND_DEADLINE_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * extend deadline
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const extendDeadlineApi = (params) => {
  const uri = `/v1/plans/moderations/evenly`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doExtendDeadline(action) {
  try {
    const response = yield call(extendDeadlineApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(extendDeadlineSuccess(response.data))

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
    yield put(extendDeadlineFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch submit extend deadline
 */
export default function* watchExtendDeadline() {
  yield takeLatest(EXTEND_DEADLINE_START, doExtendDeadline)
}
