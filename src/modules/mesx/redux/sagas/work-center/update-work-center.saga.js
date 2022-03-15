import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWorkCenterFailed,
  updateWorkCenterSuccess,
  UPDATE_WORK_CENTER_START,
} from '~/modules/mesx/redux/actions/work-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update work center api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWorkCenterApi = (params) => {
  const uri = `/v1/produces/work-centers/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWorkCenter(action) {
  try {
    const response = yield call(updateWorkCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWorkCenterSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWorkCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateWorkCenter() {
  yield takeLatest(UPDATE_WORK_CENTER_START, doUpdateWorkCenter)
}
