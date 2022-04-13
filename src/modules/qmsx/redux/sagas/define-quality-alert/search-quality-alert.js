import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchQualityAlertFail,
  searchQualityAlertSuccess,
  SEARCH_QUALITY_ALERT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'

/**
 * Search quality-alert API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchQualityAlert = (params) => {
  const uri = `/v1/quality-controls/alerts`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchQualityAlert(action) {
  try {
    const response = yield call(searchQualityAlert, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      // Call callback action if provided
      yield put(searchQualityAlertSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchQualityAlertFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search quality-alert action
 */
export default function* watchSearchQualityAlert() {
  yield takeLatest(SEARCH_QUALITY_ALERT_START, doSearchQualityAlert)
}
