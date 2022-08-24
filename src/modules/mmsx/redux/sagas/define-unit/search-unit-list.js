import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDefineUnitListFail,
  getDefineUnitListSuccess,
  MMSX_GET_DEFINE_UNIT_LIST_START,
} from '../../actions/defineUnit'

const getUnitListApi = (params) => {
  const url = `v1/mms/attribute-type`
  return api.get(url, params)
}

function* doGetUnitList(action) {
  try {
    const response = yield call(getUnitListApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getDefineUnitListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDefineUnitListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetUnitList() {
  yield takeLatest(MMSX_GET_DEFINE_UNIT_LIST_START, doGetUnitList)
}
