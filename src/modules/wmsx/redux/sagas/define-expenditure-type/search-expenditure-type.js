import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchExpenditureTypeFailed,
  searchExpenditureTypeSuccess,
  SEARCH_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'

export const searchExpenditureTypeApi = (params) => {
  const uri = `/v1/sales/cost-types/list`
  return api.get(uri, params)
}

function* doSearchExpenditureType(action) {
  try {
    const response = yield call(searchExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchExpenditureTypeSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchExpenditureTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchExpenditureType() {
  yield takeLatest(SEARCH_EXPENDITURE_TYPE_START, doSearchExpenditureType)
}
