import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmReceiptDepartmentByIdFailed,
  confirmReceiptDepartmentByIdSuccess,
  CONFIRM_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/${params}/confirm`
  return api.put(uri)
}

function* doConfirmReceiptDepartment(action) {
  try {
    const response = yield call(confirmReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmReceiptDepartmentByIdSuccess(response.payload))

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
    yield put(confirmReceiptDepartmentByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmReceiptDepartment() {
  yield takeLatest(CONFIRM_RECEIPT_DEPARTMENT_START, doConfirmReceiptDepartment)
}