import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getExpenditureOrgDetailsByIdFailed,
  getExpenditureOrgDetailsByIdSuccess,
  GET_EXPENDITURE_ORG_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'

const getExpenditureOrgDetailsApi = (params) => {
  const uri = `/v1/sales/organization-payments/${params}`
  return api.get(uri)
}

function* doGetExpenditureOrgDetails(action) {
  try {
    const response = yield call(getExpenditureOrgDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getExpenditureOrgDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getExpenditureOrgDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetExpenditureOrgDetails() {
  yield takeLatest(
    GET_EXPENDITURE_ORG_DETAILS_START,
    doGetExpenditureOrgDetails,
  )
}
