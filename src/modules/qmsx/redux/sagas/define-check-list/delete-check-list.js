import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCheckListFail,
  deleteCheckListSuccess,
  DELETE_CHECK_LIST_START,
} from '~/modules/qmsx/redux/actions/define-check-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete check list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCheckListApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCheckList(action) {
  try {
    const response = yield call(deleteCheckListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCheckListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:defineCheckList.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteCheckListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete check list
 */
export default function* watchDeleteCheckList() {
  yield takeLatest(DELETE_CHECK_LIST_START, doDeleteCheckList)
}
