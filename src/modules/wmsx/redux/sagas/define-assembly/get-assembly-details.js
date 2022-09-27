import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAssemblyDetailsByIdFailed,
  getAssemblyDetailsByIdSuccess,
  GET_ASSEMBLY_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'

const getAssemblyDetailsApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}`
  return api.get(uri)
}

function* doGetAssemblyDetails(action) {
  try {
    const response = yield call(getAssemblyDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getAssemblyDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAssemblyDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAssemblyDetails() {
  yield takeLatest(GET_ASSEMBLY_DETAILS_START, doGetAssemblyDetails)
}
