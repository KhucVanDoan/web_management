import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createQualityPointFail,
  createQualityPointSuccess,
  CREATE_QUALITY_POINT_START,
} from '~/modules/qmsx/redux/actions/define-quality-point'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create quality-point API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createQualityPointApi = (body) => {
  const uri = `/v1/quality-controls/quality-points/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateQualityPoint(action) {
  try {
    const response = yield call(createQualityPointApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createQualityPointSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineQualityPoint.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createQualityPointFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch quality-point
 */
export default function* watchCreateQualityPoint() {
  yield takeLatest(CREATE_QUALITY_POINT_START, doCreateQualityPoint)
}
