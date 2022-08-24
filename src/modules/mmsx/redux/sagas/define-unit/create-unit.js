import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createUnitFail,
  createUnitSuccess,
  MMSX_CREATE_UNIT_START,
} from '../../actions/defineUnit'

const createUnitApi = (params) => {
  const url = ``
  return api.post(url, params)
}

function* doCreateUnit(action) {
  try {
    const response = yield call(createUnitApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createUnitSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createUnitFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateUnit() {
  yield takeLatest(MMSX_CREATE_UNIT_START, doCreateUnit)
}
