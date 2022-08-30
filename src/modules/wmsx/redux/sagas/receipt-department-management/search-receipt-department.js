import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchReceiptDepartmentFailed,
  searchReceiptDepartmentSuccess,
  SEARCH_RECEIPT_DEPARTMENT_START,
} from '~/modules/wmsx/redux/actions/receipt-department-management'
import { api } from '~/services/api'

export const searchReceiptDepartmentApi = (params) => {
  const uri = `/v1/users/department-receipts/list`
  return api.get(uri, params)
}

function* doSearchReceiptDepartment(action) {
  try {
    const response = yield call(searchReceiptDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchReceiptDepartmentSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchReceiptDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchReceiptDepartment() {
  yield takeLatest(SEARCH_RECEIPT_DEPARTMENT_START, doSearchReceiptDepartment)
}
