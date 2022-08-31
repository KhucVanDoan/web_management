import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmExpenditureOrgByIdFailed,
  confirmExpenditureOrgByIdSuccess,
  CONFIRM_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmExpenditureOrgApi = (params) => {
  const uri = `/v1/sales/organization-payments/${params}/confirm`
  return api.put(uri)
}

function* doConfirmExpenditureOrg(action) {
  try {
    const response = yield call(confirmExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmExpenditureOrgByIdSuccess(response.payload))

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
    yield put(confirmExpenditureOrgByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmExpenditureOrg() {
  yield takeLatest(CONFIRM_EXPENDITURE_ORG_START, doConfirmExpenditureOrg)
}
