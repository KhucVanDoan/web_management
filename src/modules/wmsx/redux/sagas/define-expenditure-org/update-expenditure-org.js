import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateExpenditureOrgFailed,
  updateExpenditureOrgSuccess,
  UPDATE_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateExpenditureOrgApi = (params) => {
  const uri = `/v1/sales/organization-payments/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateExpenditureOrg(action) {
  try {
    const response = yield call(updateExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateExpenditureOrgSuccess(response.results))

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
    yield put(updateExpenditureOrgFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateExpenditureOrg() {
  yield takeLatest(UPDATE_EXPENDITURE_ORG_START, doUpdateExpenditureOrg)
}
