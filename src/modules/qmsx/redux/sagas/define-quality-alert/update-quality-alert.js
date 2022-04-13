import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateQualityAlertFail,
  updateQualityAlertSuccess,
  UPDATE_QUALITY_ALERT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update quality-alert action API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateQualityAlertApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.type}/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateQualityAlert(action) {
  try {
    const response = yield call(updateQualityAlertApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateQualityAlertSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineQualityAlert.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateQualityAlertFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update quality-alert action
 */
export default function* watchUpdateQualityAlert() {
  yield takeLatest(UPDATE_QUALITY_ALERT_START, doUpdateQualityAlert)
}
