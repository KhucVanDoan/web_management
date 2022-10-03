import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMaterialChildDetailsByIdFailed,
  getMaterialChildDetailsByIdSuccess,
  GET_MATERIAL_CHILD_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-material-category'
import { api } from '~/services/api'

export const getMaterialChildDetailsApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}/descendant`
  return api.get(uri)
}

function* doGetMaterialChildDetails(action) {
  try {
    const response = yield call(getMaterialChildDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMaterialChildDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaterialChildDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetMaterialChildDetails() {
  yield takeLatest(GET_MATERIAL_CHILD_DETAILS_START, doGetMaterialChildDetails)
}
