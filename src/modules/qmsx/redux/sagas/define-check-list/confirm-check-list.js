import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmCheckListFail,
  confirmCheckListSuccess,
  CONFIRM_CHECK_LIST_START,
} from '~/modules/qmsx/redux/actions/define-check-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm check list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmCheckListApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/${params.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmCheckList(action) {
  try {
    const response = yield call(confirmCheckListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmCheckListSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:defineCheckList.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmCheckListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm check list
 */
export default function* watchConfirmCheckList() {
  yield takeLatest(CONFIRM_CHECK_LIST_START, doConfirmCheckList)
}