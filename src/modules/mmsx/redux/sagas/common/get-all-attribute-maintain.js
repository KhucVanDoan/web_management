import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getAttributeMaintainFailed,
  getAttributeMaintainSuccess,
  MMSX_GET_ATTRIBUTE_MAINTAIN_START,
} from '../../actions/common'
/**
 * Get
 * @returns {Promise}
 */
const getAttributeMaintainApi = () => {
  const isGetAll = {
    isGetAll: 1,
  }
  const uri = `v1/mms/maintenance-attributes/list`
  return api.get(uri, isGetAll)
}

/*Worker */
function* doGetAttributeMaintain(action) {
  try {
    const response = yield call(getAttributeMaintainApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getAttributeMaintainSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAttributeMaintainFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/*Watcher */
export default function* watchGetAttributeMaintain() {
  yield takeLatest(MMSX_GET_ATTRIBUTE_MAINTAIN_START, doGetAttributeMaintain)
}
