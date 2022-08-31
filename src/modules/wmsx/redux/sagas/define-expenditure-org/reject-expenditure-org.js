import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectExpenditureOrgByIdFailed,
  rejectExpenditureOrgByIdSuccess,
  REJECT_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectExpenditureOrgApi = (params) => {
  const uri = `/v1/sales/organization-payments/${params}/reject`
  return api.put(uri)
}

function* doRejectExpenditureOrg(action) {
  try {
    const response = yield call(rejectExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectExpenditureOrgByIdSuccess(response.payload))

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
    yield put(rejectExpenditureOrgByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectExpenditureOrg() {
  yield takeLatest(REJECT_EXPENDITURE_ORG_START, doRejectExpenditureOrg)
}
