import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAttribuiteBusinessTypeDetailsByIdFailed,
  getAttribuiteBusinessTypeDetailsByIdSuccess,
  GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'

export const getAttribuiteBusinessTypeDetailsApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/attribute-details`
  return api.get(uri, params)
}
function* doGetAttribuiteBusinessTypeDetails(action) {
  try {
    const response = yield call(
      getAttribuiteBusinessTypeDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getAttribuiteBusinessTypeDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAttribuiteBusinessTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAttribuiteBusinessTypeDetails() {
  yield takeLatest(
    GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START,
    doGetAttribuiteBusinessTypeDetails,
  )
}
