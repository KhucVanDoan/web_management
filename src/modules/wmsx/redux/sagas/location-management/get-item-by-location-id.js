import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemByLocationIdFailed,
  getItemByLocationIdSuccess,
  GET_ITEM_BY_LOCATION_ID_START,
} from '~/modules/wmsx/redux/actions/location-management'
import { api } from '~/services/api'

const getItemByLocationIdApi = (params) => {
  const uri = `/v1/items/warehouse-stock?locatorIds=${params}`
  return api.get(uri)
}

function* doGetItemByLocationId(action) {
  try {
    const response = yield call(getItemByLocationIdApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemByLocationIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemByLocationIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetItemByLocationId() {
  yield takeLatest(GET_ITEM_BY_LOCATION_ID_START, doGetItemByLocationId)
}
