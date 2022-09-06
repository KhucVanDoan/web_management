import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteExpenditureOrgFailed,
  deleteExpenditureOrgSuccess,
  DELETE_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteExpenditureOrgApi = (params) => {
  const uri = `/v1/sales/organization-payments/${params}`
  return api.delete(uri)
}

function* doDeleteExpenditureOrg(action) {
  try {
    const response = yield call(deleteExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteExpenditureOrgSuccess(response.results))

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
    yield put(deleteExpenditureOrgFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteExpenditureOrg() {
  yield takeLatest(DELETE_EXPENDITURE_ORG_START, doDeleteExpenditureOrg)
}
