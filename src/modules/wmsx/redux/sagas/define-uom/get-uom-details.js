import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getUomDetailsByIdFailed,
  getUomDetailsByIdSuccess,
  GET_UOM_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'

const getUomDetailsApi = (params) => {
  const uri = `/v1/items/item-unit-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUomDetails(action) {
  try {
    const response = yield call(getUomDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUomDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUomDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetUomDetails() {
  yield takeLatest(GET_UOM_DETAILS_START, doGetUomDetails)
}
