import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmCompanyByIdFailed,
  confirmCompanyByIdSuccess,
  CONFIRM_COMPANY_START,
} from '~/modules/wmsx/redux/actions/company-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmCompanyApi = (params) => {
  const uri = `/v1/users/companies/${params}/confirm`
  return api.put(uri)
}

function* doConfirmCompany(action) {
  try {
    const response = yield call(confirmCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmCompanyByIdSuccess(response.payload))

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
    yield put(confirmCompanyByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmCompany() {
  yield takeLatest(CONFIRM_COMPANY_START, doConfirmCompany)
}
