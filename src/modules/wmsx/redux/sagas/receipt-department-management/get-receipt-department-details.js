import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getReceiptDepartmentDetailsByIdFailed,
  getReceiptDepartmentDetailsByIdSuccess,
  GET_RECEIPT_DEPARTMENT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'

const getReceiptDepartmentDetailsApi = (params) => {
  const uri = `/v1/users/department-receipts/${params}`
  return api.get(uri)
}

function* doGetReceiptDepartmentDetails(action) {
  try {
    const response = yield call(getReceiptDepartmentDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getReceiptDepartmentDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getReceiptDepartmentDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetReceiptDepartmentDetails() {
  yield takeLatest(
    GET_RECEIPT_DEPARTMENT_DETAILS_START,
    doGetReceiptDepartmentDetails,
  )
}
