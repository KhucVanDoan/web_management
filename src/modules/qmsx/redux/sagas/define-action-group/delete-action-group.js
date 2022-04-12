import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteActionGroupFail,
  deleteActionGroupSuccess,
  DELETE_ACTION_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-action-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete Action-Group record API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteActionGroupApi = (params) => {
  const uri = `/v1/quality-controls/action-categories/${params?.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteActionGroup(action) {
  try {
    const response = yield call(deleteActionGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteActionGroupSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineActionGroup.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteActionGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch delete Action Group
 */
export default function* watchDeleteActionGroup() {
  yield takeLatest(DELETE_ACTION_GROUP_START, doDeleteActionGroup)
}
