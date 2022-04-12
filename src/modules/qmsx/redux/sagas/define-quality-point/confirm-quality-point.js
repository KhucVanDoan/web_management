import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmQualityPointFail,
  confirmQualityPointSuccess,
  CONFIRM_QUALITY_POINT_START,
} from '~/modules/qmsx/redux/actions/define-quality-point'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm quality-point API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmQualityPointApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/${params.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmQualityPoint(action) {
  try {
    const response = yield call(confirmQualityPointApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmQualityPointSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:defineQualityPoint.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmQualityPointFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm quality-point
 */
export default function* watchConfirmQualityPoint() {
  yield takeLatest(CONFIRM_QUALITY_POINT_START, doConfirmQualityPoint)
}
