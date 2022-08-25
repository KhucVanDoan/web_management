import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchBusinessTypesFailed,
  searchBusinessTypesSuccess,
  SEARCH_BUSINESS_TYPES_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'

export const searchBusinessTypesApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/list`
  return api.get(uri, params)
}

function* doSearchBusinessTypes(action) {
  try {
    const response = yield call(searchBusinessTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBusinessTypesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBusinessTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchBusinessTypes() {
  yield takeLatest(SEARCH_BUSINESS_TYPES_START, doSearchBusinessTypes)
}
