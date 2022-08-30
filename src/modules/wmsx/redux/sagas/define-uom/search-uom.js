import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchUomsFailed,
  searchUomsSuccess,
  SEARCH_UOMS_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'

export const searchUomsApi = (params) => {
  const uri = `/v1/items/item-unit-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchUoms(action) {
  try {
    const response = yield call(searchUomsApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchUomsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchUomsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchUoms() {
  yield takeLatest(SEARCH_UOMS_START, doSearchUoms)
}
