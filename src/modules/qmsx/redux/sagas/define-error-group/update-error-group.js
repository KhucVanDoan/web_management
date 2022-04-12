import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateErrorGroupFail,
  updateErrorGroupSuccess,
  UPDATE_ERROR_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-error-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update Error Group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateErrorGroupApi = (params) => {
  const uri = `/v1/quality-controls/error-groups/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateErrorGroup(action) {
  try {
    const response = yield call(updateErrorGroupApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(updateErrorGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineErrorGroup.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateErrorGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch update ErrorGroup
 */
export default function* watchUpdateErrorGroup() {
  yield takeLatest(UPDATE_ERROR_GROUP_START, doUpdateErrorGroup)
}
