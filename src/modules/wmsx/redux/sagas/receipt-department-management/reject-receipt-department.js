import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectReceiptDepartmentByIdFailed,
  rejectReceiptDepartmentByIdSuccess,
  REJECT_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/${params}/reject`
  return api.put(uri)
}

function* doRejectReceiptDepartment(action) {
  try {
    const response = yield call(rejectReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectReceiptDepartmentByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectReceiptDepartmentByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectReceiptDepartment() {
  yield takeLatest(REJECT_RECEIPT_DEPARTMENT_START, doRejectReceiptDepartment)
}
