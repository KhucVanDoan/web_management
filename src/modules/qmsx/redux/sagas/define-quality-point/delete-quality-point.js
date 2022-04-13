import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteQualityPointFail,
  deleteQualityPointSuccess,
  DELETE_QUALITY_POINT_START,
} from '~/modules/qmsx/redux/actions/define-quality-point'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete quality-point API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteQualityPointApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteQualityPoint(action) {
  try {
    const response = yield call(deleteQualityPointApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteQualityPointSuccess(response?.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineQualityPoint.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteQualityPointFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete quality-point
 */
export default function* watchDeleteQualityPoint() {
  yield takeLatest(DELETE_QUALITY_POINT_START, doDeleteQualityPoint)
}
