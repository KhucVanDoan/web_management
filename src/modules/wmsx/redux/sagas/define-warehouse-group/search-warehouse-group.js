import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseGroupFailed,
  searchWarehouseGroupSuccess,
  SEARCH_WAREHOUSE_GROUP_START,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'
import { api } from '~/services/api'

export const searchWarehouseGroupApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/list`
  return api.get(uri, params)
}

function* doSearchWarehouseGroup(action) {
  try {
    const response = yield call(searchWarehouseGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseGroupSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarehouseGroup() {
  yield takeLatest(SEARCH_WAREHOUSE_GROUP_START, doSearchWarehouseGroup)
}
