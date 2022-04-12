import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmQualityAlertFail,
  confirmQualityAlertSuccess,
  CONFIRM_QUALITY_ALERT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm quality-alert API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmQualityAlertApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params?.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmQualityAlert(action) {
  try {
    const response = yield call(confirmQualityAlertApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmQualityAlertSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:defineQualityAlert.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmQualityAlertFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm quality-alert action
 */
export default function* watchConfirmQualityAlert() {
  yield takeLatest(CONFIRM_QUALITY_ALERT_START, doConfirmQualityAlert)
}
