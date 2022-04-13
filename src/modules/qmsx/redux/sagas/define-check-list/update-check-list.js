import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCheckListFail,
  updateCheckListSuccess,
  UPDATE_CHECK_LIST_START,
} from '~/modules/qmsx/redux/actions/define-check-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update check list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCheckListApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCheckList(action) {
  try {
    const response = yield call(updateCheckListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateCheckListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineCheckList.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateCheckListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update check list
 */
export default function* watchUpdateCheckList() {
  yield takeLatest(UPDATE_CHECK_LIST_START, doUpdateCheckList)
}
