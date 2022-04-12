import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createQualityAlertFail,
  createQualityAlertSuccess,
  CREATE_QUALITY_ALERT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create quality-alert API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createQualityAlertApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.type}`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateQualityAlert(action) {
  try {
    const response = yield call(createQualityAlertApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createQualityAlertSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineQualityAlert.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createQualityAlertFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create quality-alert action
 */
export default function* watchCreateQualityAlert() {
  yield takeLatest(CREATE_QUALITY_ALERT_START, doCreateQualityAlert)
}
