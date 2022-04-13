import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getQualityPointDetailByIdFail,
  getQualityPointDetailByIdSuccess,
  GET_QUALITY_POINT_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-quality-point'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get quality-point detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityPointDetailApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQualityPointDetail(action) {
  try {
    const response = yield call(getQualityPointDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQualityPointDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getQualityPointDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get quality-point detail
 */
export default function* watchGetQualityPointDetail() {
  yield takeLatest(GET_QUALITY_POINT_DETAIL_START, doGetQualityPointDetail)
}
