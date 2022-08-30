import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createReceiptDepartmentFailed,
  createReceiptDepartmentSuccess,
  CREATE_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createReceiptDepartmentApi = (body) => {
  const uri = `/v1/users/department-receipts/create`
  return api.post(uri, body)
}

function* doCreateReceiptDepartment(action) {
  try {
    const response = yield call(createReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createReceiptDepartmentSuccess(response.data))

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
    yield put(createReceiptDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateReceiptDepartment() {
  yield takeLatest(CREATE_RECEIPT_DEPARTMENT_START, doCreateReceiptDepartment)
}
