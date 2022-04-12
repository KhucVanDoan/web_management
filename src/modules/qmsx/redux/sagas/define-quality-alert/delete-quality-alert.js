import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteQualityAlertFail,
  deleteQualityAlertSuccess,
  DELETE_QUALITY_ALERT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete quality-alert API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteQualityAlertApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteQualityAlert(action) {
  try {
    const response = yield call(deleteQualityAlertApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteQualityAlertSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineQualityAlert.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteQualityAlertFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete quality-alert action
 */
export default function* watchDeleteQualityAlert() {
  yield takeLatest(DELETE_QUALITY_ALERT_START, doDeleteQualityAlert)
}
