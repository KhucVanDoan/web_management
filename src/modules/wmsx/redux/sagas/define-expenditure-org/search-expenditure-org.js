import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchExpenditureOrgFailed,
  searchExpenditureOrgSuccess,
  SEARCH_EXPENDITURE_ORG_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'
import { api } from '~/services/api'

export const searchExpenditureOrgApi = (params) => {
  const uri = `/v1/sales/organization-payments/list`
  return api.get(uri, params)
}

function* doSearchExpenditureOrg(action) {
  try {
    const response = yield call(searchExpenditureOrgApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchExpenditureOrgSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchExpenditureOrgFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchExpenditureOrg() {
  yield takeLatest(SEARCH_EXPENDITURE_ORG_START, doSearchExpenditureOrg)
}
