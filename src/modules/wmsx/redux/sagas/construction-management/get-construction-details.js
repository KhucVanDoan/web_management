import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getConstructionDetailsByIdFailed,
  getConstructionDetailsByIdSuccess,
  GET_CONSTRUCTION_DETAILS_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'

const getConstructionDetailsApi = (params) => {
  const uri = `/v1/sales/constructions/${params}`
  return api.get(uri)
}

function* doGetConstructionDetails(action) {
  try {
    const response = yield call(getConstructionDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getConstructionDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getConstructionDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetConstructionDetails() {
  yield takeLatest(GET_CONSTRUCTION_DETAILS_START, doGetConstructionDetails)
}
