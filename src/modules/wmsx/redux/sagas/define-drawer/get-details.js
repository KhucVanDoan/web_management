import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDrawerDetailsByIdFailed,
  getDrawerDetailsByIdSuccess,
  GET_DRAWER_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'

const getDrawerDetailsApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.get(uri)
}

function* doGetDrawerDetails(action) {
  try {
    const response = yield call(getDrawerDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDrawerDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDrawerDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDrawerDetails() {
  yield takeLatest(GET_DRAWER_DETAILS_START, doGetDrawerDetails)
}
