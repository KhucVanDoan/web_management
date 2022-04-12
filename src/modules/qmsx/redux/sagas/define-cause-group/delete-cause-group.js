import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCauseGroupFail,
  deleteCauseGroupSuccess,
  DELETE_CAUSE_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-cause-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete cause group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCauseGroupApi = (params) => {
  const uri = `/v1/quality-controls/cause-groups/${params?.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCauseGroup(action) {
  try {
    const response = yield call(deleteCauseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCauseGroupSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineCauseGroup.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteCauseGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete cause group
 */
export default function* watchDeleteCauseGroup() {
  yield takeLatest(DELETE_CAUSE_GROUP_START, doDeleteCauseGroup)
}
