import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMaterialsFailed,
  searchMaterialsSuccess,
  SEARCH_MATERIALS_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'

export const searchMaterialsApi = (params) => {
  const uri = `/v1/items/list`
  return api.get(uri, params)
}

function* doSearchMaterials(action) {
  try {
    const response = yield call(searchMaterialsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMaterialsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMaterialsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchMaterials() {
  yield takeLatest(SEARCH_MATERIALS_START, doSearchMaterials)
}
