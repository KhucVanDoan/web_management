import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMaterialDetailsByIdFailed,
  getMaterialDetailsByIdSuccess,
  GET_MATERIAL_DETAILS_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'

export const getMaterialDetailsApi = (params) => {
  //@TODO udpate api
  const uri = `/v1/items/${params}`
  return api.get(uri)
}

function* doGetMaterialDetails(action) {
  try {
    const response = yield call(getMaterialDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMaterialDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaterialDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetMaterialDetails() {
  yield takeLatest(GET_MATERIAL_DETAILS_START, doGetMaterialDetails)
}
