import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBinDetailsByIdFailed,
  getBinDetailsByIdSuccess,
  GET_BIN_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'

const getBinDetailsApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.get(uri)
}

function* doGetBinDetails(action) {
  try {
    const response = yield call(getBinDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBinDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBinDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetBinDetails() {
  yield takeLatest(GET_BIN_DETAILS_START, doGetBinDetails)
}
