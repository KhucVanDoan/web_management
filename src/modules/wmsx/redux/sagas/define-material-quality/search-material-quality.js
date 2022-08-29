import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMaterialQualityFailed,
  searchMaterialQualitySuccess,
  SEARCH_MATERIAL_QUALITY_START,
} from '~/modules/wmsx/redux/actions/define-material-quality'
import { api } from '~/services/api'

export const searchMaterialQualityApi = (params) => {
  const uri = `/v1/items/item-qualities/list`
  return api.get(uri, params)
}

function* doSearchMaterialQuality(action) {
  try {
    const response = yield call(searchMaterialQualityApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMaterialQualitySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMaterialQualityFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchMaterialQuality() {
  yield takeLatest(SEARCH_MATERIAL_QUALITY_START, doSearchMaterialQuality)
}
