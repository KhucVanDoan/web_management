import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getAllSuppliesConfirmSuccess,
  getAllSuppliesConfirmFailed,
  MMSX_GET_ALL_SUPPLIES_CONFIRM_START,
} from '../../actions/common'
/**
 * Get
 * @returns {Promise}
 */
const getAllSuppliesConfirmApi = () => {
  const uri = `v1/mms/supplies`
  return api.get(uri)
}

/*Worker */
function* doGetAllSuppliesConfirm(action) {
  try {
    const response = yield call(getAllSuppliesConfirmApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getAllSuppliesConfirmSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllSuppliesConfirmFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/*Watcher */
export default function* watchGetAllSuppliesConfirm() {
  yield takeLatest(MMSX_GET_ALL_SUPPLIES_CONFIRM_START, doGetAllSuppliesConfirm)
}
