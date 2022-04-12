import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_MATERIAL_LIST_START,
  getMaterialListFail,
  getMaterialListSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get material list API
 * @returns {Promise}
 */
const getMaterialListApi = (params) => {
  const uri = `/v1/quality-controls/materials/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMaterialList(action) {
  try {
    const response = yield call(getMaterialListApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getMaterialListSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getMaterialListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get material list
 */
export default function* watchGetMaterialList() {
  yield takeLatest(GET_MATERIAL_LIST_START, doGetMaterialList)
}
