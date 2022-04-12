import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCauseGroupFail,
  updateCauseGroupSuccess,
  UPDATE_CAUSE_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-cause-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update cause group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCauseGroupApi = (params) => {
  const uri = `/v1/quality-controls/cause-groups/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCauseGroup(action) {
  try {
    const response = yield call(updateCauseGroupApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(updateCauseGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineCauseGroup.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateCauseGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch update cause group
 */
export default function* watchUpdateCauseGroup() {
  yield takeLatest(UPDATE_CAUSE_GROUP_START, doUpdateCauseGroup)
}
