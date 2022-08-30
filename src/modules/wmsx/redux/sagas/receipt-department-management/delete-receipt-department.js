import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteReceiptDepartmentFailed,
  deleteReceiptDepartmentSuccess,
  DELETE_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/${params}`
  return api.delete(uri)
}

function* doDeleteReceiptDepartment(action) {
  try {
    const response = yield call(deleteReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteReceiptDepartmentSuccess(response.results))

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
    yield put(deleteReceiptDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteReceiptDepartment() {
  yield takeLatest(DELETE_RECEIPT_DEPARTMENT_START, doDeleteReceiptDepartment)
}
