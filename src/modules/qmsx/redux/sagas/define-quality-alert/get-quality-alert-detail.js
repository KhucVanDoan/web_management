import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getQualityAlertDetailByIdFail,
  getQualityAlertDetailByIdSuccess,
  GET_QUALITY_ALERT_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get quality-alert-detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityAlertDetailApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.type}/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQualityAlertDetail(action) {
  try {
    const response = yield call(getQualityAlertDetailApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getQualityAlertDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getQualityAlertDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetQualityAlertDetail() {
  yield takeLatest(GET_QUALITY_ALERT_DETAIL_START, doGetQualityAlertDetail)
}
