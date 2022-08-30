import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBusinessTypeDetailsByIdFailed,
  getBusinessTypeDetailsByIdSuccess,
  GET_BUSINESS_TYPE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'

const getBusinessTypeDetailsApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/${params}`
  return api.get(uri)
}

function* doGetBusinessTypeDetails(action) {
  try {
    const response = yield call(getBusinessTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBusinessTypeDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBusinessTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetBusinessTypeDetails() {
  yield takeLatest(GET_BUSINESS_TYPE_DETAILS_START, doGetBusinessTypeDetails)
}
