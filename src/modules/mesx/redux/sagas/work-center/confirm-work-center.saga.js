import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWorkCenterSuccess,
  confirmWorkCenterFailed,
  CONFIRM_WORK_CENTER_START,
} from '~/modules/mesx/redux/actions/work-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm work center
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmWorkCenterApi = (params) => {
  const uri = `v1/produces/work-centers/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmWorkCenter(action) {
  try {
    const response = yield call(confirmWorkCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWorkCenterSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'workCenter.confirmSOExportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWorkCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm so export
 */
export default function* watchConfirmWorkCenter() {
  yield takeLatest(CONFIRM_WORK_CENTER_START, doConfirmWorkCenter)
}
