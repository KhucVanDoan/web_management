import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMaterialQualityDetailsByIdFailed,
  getMaterialQualityDetailsByIdSuccess,
  GET_MATERIAL_QUALITY_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'

const getMaterialQualityDetailsApi = (params) => {
  const uri = `/v1/items/item-qualities/${params}`
  return api.get(uri)
}

function* doGetMaterialQualityDetails(action) {
  try {
    const response = yield call(getMaterialQualityDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMaterialQualityDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaterialQualityDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetMaterialQualityDetails() {
  yield takeLatest(
    GET_MATERIAL_QUALITY_DETAILS_START,
    doGetMaterialQualityDetails,
  )
}
