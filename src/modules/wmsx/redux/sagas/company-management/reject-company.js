import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectCompanyByIdFailed,
  rejectCompanyByIdSuccess,
  REJECT_COMPANY_START,
} from '~/modules/wmsx/redux/actions/company-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectCompanyApi = (params) => {
  const uri = `/v1/users/companies/${params}/reject`
  return api.put(uri)
}

function* doRejectCompany(action) {
  try {
    const response = yield call(rejectCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectCompanyByIdSuccess(response.payload))

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
    yield put(rejectCompanyByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectCompany() {
  yield takeLatest(REJECT_COMPANY_START, doRejectCompany)
}
