import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateReceiptDepartmentFailed,
  updateReceiptDepartmentSuccess,
  UPDATE_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateReceiptDepartment(action) {
  try {
    const response = yield call(updateReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateReceiptDepartmentSuccess(response.results))

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
    yield put(updateReceiptDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateReceiptDepartment() {
  yield takeLatest(UPDATE_RECEIPT_DEPARTMENT_START, doUpdateReceiptDepartment)
}
