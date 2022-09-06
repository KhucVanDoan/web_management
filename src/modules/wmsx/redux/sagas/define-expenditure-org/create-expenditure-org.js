import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createExpenditureOrgFailed,
  createExpenditureOrgSuccess,
  CREATE_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createExpenditureOrgApi = (body) => {
  const uri = `/v1/sales/organization-payments/create`
  return api.post(uri, body)
}

function* doCreateExpenditureOrg(action) {
  try {
    const response = yield call(createExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createExpenditureOrgSuccess(response.data))

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
    yield put(createExpenditureOrgFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateExpenditureOrg() {
  yield takeLatest(CREATE_EXPENDITURE_ORG_START, doCreateExpenditureOrg)
}
