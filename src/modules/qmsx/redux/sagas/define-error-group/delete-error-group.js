import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteErrorGroupFail,
  deleteErrorGroupSuccess,
  DELETE_ERROR_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-error-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete error group record API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteErrorGroupApi = (params) => {
  const uri = `/v1/quality-controls/error-groups/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteErrorGroup(action) {
  try {
    const response = yield call(deleteErrorGroupApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(deleteErrorGroupSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineErrorGroup.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteErrorGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch delete Error Group record
 */
export default function* watchDeleteErrorGroup() {
  yield takeLatest(DELETE_ERROR_GROUP_START, doDeleteErrorGroup)
}
