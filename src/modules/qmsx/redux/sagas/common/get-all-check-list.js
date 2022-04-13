import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ALL_CHECK_LIST_START,
  getAllCheckListSuccess,
  getAllCheckListFailed,
} from '~/modules/qmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * GET all check-list has confirmed API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAllCheckListApi = (params) => {
  const uri = `v1/quality-controls/check-lists/confirms`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAllCheckList(action) {
  try {
    const response = yield call(getAllCheckListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getAllCheckListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllCheckListFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetAllCheckList() {
  yield takeLatest(GET_ALL_CHECK_LIST_START, doGetAllCheckList)
}
