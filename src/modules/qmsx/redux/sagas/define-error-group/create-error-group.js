import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createErrorGroupFail,
  createErrorGroupSuccess,
  CREATE_ERROR_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-error-group'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create error group record API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createErrorGroupApi = (params) => {
  const uri = `/v1/quality-controls/error-groups`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateErrorGroup(action) {
  try {
    const response = yield call(createErrorGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createErrorGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineErrorGroup.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createErrorGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch create error group
 */
export default function* watchCreateErrorGroup() {
  yield takeLatest(CREATE_ERROR_GROUP_START, doCreateErrorGroup)
}
