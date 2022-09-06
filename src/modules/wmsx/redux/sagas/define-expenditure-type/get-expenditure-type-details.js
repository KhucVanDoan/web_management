import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getExpenditureTypeDetailsByIdFailed,
  getExpenditureTypeDetailsByIdSuccess,
  GET_EXPENDITURE_TYPE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'

const getExpenditureTypeDetailsApi = (params) => {
  const uri = `/v1/sales/cost-types/${params}`
  return api.get(uri)
}

function* doGetExpenditureTypeDetails(action) {
  try {
    const response = yield call(getExpenditureTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getExpenditureTypeDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getExpenditureTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetExpenditureTypeDetails() {
  yield takeLatest(
    GET_EXPENDITURE_TYPE_DETAILS_START,
    doGetExpenditureTypeDetails,
  )
}
